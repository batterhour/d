import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BuyApartment from "./pages/BuyApartment";
import BuyHouse from "./pages/BuyHouse";
import BuyVilla from "./pages/BuyVilla";
import BuyProperty from "./pages/BuyProperty";
import Site1 from "./pages/Site1";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/buy-apartment" element={<BuyApartment />} />
      <Route path="/buy-house" element={<BuyHouse />} />
      <Route path="/buy-villa" element={<BuyVilla />} />
      <Route path="/buy-property" element={<BuyProperty />} />
      <Route path="/site-1" element={<Site1 />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
