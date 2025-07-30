import { Routes, Route } from "react-router";
import "./App.css";
import QRScanner from "./components/scanner";
import { RestaurantMenu } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<QRScanner />} />
      <Route path="/menu" element={<RestaurantMenu />} />
    </Routes>
  );
}

export default App;
