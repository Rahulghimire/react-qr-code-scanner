import { QRCode } from "antd";

const QRCodeGenerator = ({ url }: { url: string }) => (
  <div>
    <QRCode value={url} size={200} />
  </div>
);

export default QRCodeGenerator;
