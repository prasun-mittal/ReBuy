
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import SellProduct from "./pages/SellProduct";

function App() {
  return (
    <BrowserRouter>
      <nav className="flex items-center justify-between bg-white p-4 shadow">
        <Link to="/" className="text-2xl font-bold text-green-700">
          ReBuy
        </Link>

        <Link
          to="/sell"
          className="rounded-lg bg-green-700 px-4 py-2 text-white"
        >
          Sell Product
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sell" element={<SellProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
