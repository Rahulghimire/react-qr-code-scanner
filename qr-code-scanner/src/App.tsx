import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import QRScanner from "./components/scanner";
import RestaurantMenu from "./pages/menu";
import QRCodeDesigner from "./pages/qr-code-generator";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QRScanner />} />
        <Route path="/menu" element={<RestaurantMenu />} />
        <Route path="/custom-qr-code-generator" element={<QRCodeDesigner />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
