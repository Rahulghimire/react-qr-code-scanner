import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import QRScanner from "./components/scanner";
import RestaurantMenu from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QRScanner />} />
        <Route path="/menu" element={<RestaurantMenu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
