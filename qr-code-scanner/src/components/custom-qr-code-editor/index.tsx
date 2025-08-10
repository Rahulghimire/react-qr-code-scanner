import { QRCode } from "antd";

interface QRCodeGeneratorProps {
  url: string;
  size?: number;
  color?: string;
  bgColor?: string;
  icon?: string;
}

const CustomQRCodeGenerator = ({
  url,
  size = 200,
  color = "#000000",
  bgColor = "#FFFFFF",
  icon,
}: QRCodeGeneratorProps) => (
  <QRCode
    value={url}
    size={size}
    color={color}
    bgColor={bgColor}
    icon={icon}
    bordered={false}
  />
);

export default CustomQRCodeGenerator;
