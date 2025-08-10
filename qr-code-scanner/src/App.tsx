import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import QRScanner from "./components/scanner";
import RestaurantMenu from "./pages/menu";
import QRCodeDesigner from "./pages/qr-code-generator";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/app/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<QRScanner />} />
            <Route path="/menu" element={<RestaurantMenu />} />
            <Route
              path="/custom-qr-code-generator"
              element={<QRCodeDesigner />}
            />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
