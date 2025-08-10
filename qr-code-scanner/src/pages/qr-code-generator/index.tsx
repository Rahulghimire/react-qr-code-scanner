import { useState } from "react";
import { Slider } from "antd";
import CustomQRCodeGenerator from "../../components/custom-qr-code-editor";

const QRCodeDesigner = () => {
  const [url, setUrl] = useState("https://example.com");
  const [color, setColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [size, setSize] = useState(200);
  const [icon, setIcon] = useState<string | undefined>();

  // Handle file upload and convert to base64
  const handleIconUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setIcon(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          🎨 Custom QR Code Designer
        </h1>

        {/* URL Input */}
        <label className="block mb-1 font-medium text-gray-700">
          Enter URL or Text
        </label>
        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none mb-4"
        />

        {/* Foreground Color */}
        <label className="block mb-1 font-medium text-gray-700">
          Foreground Color
        </label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full h-10 rounded-lg mb-4"
        />

        {/* Background Color */}
        <label className="block mb-1 font-medium text-gray-700">
          Background Color
        </label>
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          className="w-full h-10 rounded-lg mb-4"
        />

        {/* Size Slider */}
        <label className="block mb-1 font-medium text-gray-700">
          Size: {size}px
        </label>
        <Slider
          min={100}
          max={500}
          value={size}
          onChange={(value) => setSize(value)}
          className="mb-4"
        />

        {/* Icon Section */}
        <label className="block mb-1 font-medium text-gray-700">
          Icon (URL or Upload)
        </label>
        <input
          type="text"
          placeholder="Paste icon URL"
          value={icon || ""}
          onChange={(e) => setIcon(e.target.value || undefined)}
          className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none mb-3"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            e.target.files && handleIconUpload(e.target.files[0])
          }
          className="w-full text-sm text-gray-600
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100 mb-6"
        />

        <div className="flex justify-center p-4 bg-gray-50 rounded-xl shadow-inner">
          <CustomQRCodeGenerator
            url={url}
            size={size}
            color={color}
            bgColor={bgColor}
            icon={icon}
          />
        </div>
      </div>
    </div>
  );
};

export default QRCodeDesigner;
