import React, { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import QRCodeGenerator from "../generator";

const QRScanner: React.FC = () => {
  const [menuUrl, setMenuUrl] = useState<string>("");
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const scannerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScanSuccess = (decodedText: string) => {
      try {
        new URL(decodedText);
        setMenuUrl(decodedText);
        if (scannerRef.current) {
          scannerRef.current.clear();
        }
      } catch (e) {
        alert(
          "Invalid URL in QR code. Please scan a valid restaurant menu QR code."
        );
      }
    };

    const onScanError = (errorMessage: string) => {
      console.warn(`Scan error: ${errorMessage}`);
    };

    scannerRef.current = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
      },
      false
    );

    scannerRef.current.render(onScanSuccess, onScanError);

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch((error: unknown) => {
          console.warn(`Error clearing scanner: ${error}`);
        });
      }
    };
  }, []);

  const handleRescan = () => {
    setMenuUrl("");
    if (scannerRef.current && scannerContainerRef.current) {
      scannerRef.current.render(
        (decodedText: string) => {
          try {
            new URL(decodedText);
            setMenuUrl(decodedText);
            scannerRef.current?.clear();
          } catch (e) {
            alert(
              "Invalid URL in QR code. Please scan a valid restaurant menu QR code."
            );
          }
        },
        (errorMessage: string) => console.warn(`Scan error: ${errorMessage}`)
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-purple-200 p-4">
      <QRCodeGenerator url={"192.168.0.103:5173/menu"} />
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Restaurant Menu QR Scanner
        </h1>
        <div
          id="qr-reader"
          ref={scannerContainerRef}
          className={`p-4 border-2 border-gray-300 rounded-lg bg-gray-50 ${
            menuUrl ? "hidden" : "block"
          }`}
        ></div>
        {menuUrl && (
          <iframe
            src={menuUrl}
            className="w-full h-96 rounded-lg mt-4 border-none"
            title="Restaurant Menu"
          ></iframe>
        )}
        {menuUrl && (
          <button
            onClick={handleRescan}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Scan Another QR Code
          </button>
        )}
      </div>
    </div>
  );
};

export default QRScanner;
