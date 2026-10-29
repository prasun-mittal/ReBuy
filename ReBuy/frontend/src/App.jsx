
import { BrowserRouter, Routes, Route, NavLink, Link } from "react-router-dom";
import Home from "./pages/Home";
import SellProduct from "./pages/SellProduct";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#f7f9f6] text-gray-800">
        <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">
          <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <Link to="/" className="flex shrink-0 items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-700 text-xl font-bold text-white shadow-sm">
                R
              </span>
              <span className="text-2xl font-extrabold tracking-tight text-gray-900">
                Re<span className="text-green-700">Buy</span>
              </span>
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `text-sm font-semibold transition ${
                    isActive
                      ? "text-green-700"
                      : "text-gray-500 hover:text-green-700"
                  }`
                }
              >
                Explore
              </NavLink>

              <a
                href="/#how-it-works"
                className="text-sm font-semibold text-gray-500 transition hover:text-green-700"
              >
                How it works
              </a>
            </div>

            <NavLink
              to="/sell"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-green-700 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-green-800 hover:shadow-md sm:px-5"
            >
              <span className="text-lg leading-none">+</span>
              <span>Sell an item</span>
            </NavLink>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sell" element={<SellProduct />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          <Route
            path="*"
            element={
              <main className="mx-auto max-w-7xl px-4 py-24 text-center">
                <p className="text-5xl font-extrabold text-green-700">404</p>
                <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
                <Link
                  to="/"
                  className="mt-6 inline-block rounded-xl bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
                >
                  Back to home
                </Link>
              </main>
            }
          />
        </Routes>

        <footer className="mt-16 border-t border-gray-200 bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-7 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <p className="font-semibold text-gray-800">
              Re<span className="text-green-700">Buy</span>
              <span className="ml-2 font-normal text-gray-500">
                Buy smart. Give things a second life.
              </span>
            </p>
            <p>Discover pre-loved products, make smarter choices.</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
