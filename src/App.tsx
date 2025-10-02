import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BuyApartment from "./pages/BuyApartment";
import BuyHouse from "./pages/BuyHouse";
import BuyVilla from "./pages/BuyVilla";
import BuyProperty from "./pages/BuyProperty";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/buy-apartment" element={<BuyApartment />} />
      <Route path="/buy-house" element={<BuyHouse />} />
      <Route path="/buy-villa" element={<BuyVilla />} />
      <Route path="/buy-property" element={<BuyProperty />} />
    </Routes>
  );
}

export default App;
