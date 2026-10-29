
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api/products";

const categories = [
  "All",
  "Electronics",
  "Mobiles",
  "Fashion",
  "Furniture",
  "Books",
  "Other",
];

const money = (price) =>
  Number(price || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  });

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        setError("");
        const res = await axios.get(API_URL);
        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setError("We couldn't load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !query ||
        [product.name, product.description, product.category, product.location]
          .some((value) => String(value || "").toLowerCase().includes(query));

      const matchesCategory =
        category === "All" ||
        String(product.category || "").toLowerCase() ===
          category.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#edf5ec]">
        <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-green-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-lime-200/30 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white/80 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-green-800">
              <span className="h-2 w-2 rounded-full bg-green-600" />
              A smarter way to shop
            </div>

            <h1 className="mt-6 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Good finds.
              <br />
              <span className="text-green-700">Better prices.</span>
              <br />
              Less waste.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              Discover pre-loved products, find value in every purchase, and
              give useful things a second life with ReBuy.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#products"
                className="rounded-xl bg-green-700 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-900/10 transition hover:-translate-y-0.5 hover:bg-green-800"
              >
                Explore products <span className="ml-2">→</span>
              </a>
              <Link
                to="/sell"
                className="rounded-xl border border-green-200 bg-white px-6 py-3.5 text-sm font-bold text-green-800 transition hover:border-green-400 hover:bg-green-50"
              >
                Start selling
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-600">
              <span>✓ Find value in pre-loved items</span>
              <span>✓ Give products a second life</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute inset-4 rotate-3 rounded-[2rem] bg-green-200/60" />
            <div className="relative rounded-[2rem] border border-white bg-white p-5 shadow-xl shadow-green-900/10 sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Your next great find
                  </p>
                  <h2 className="mt-1 text-xl font-extrabold text-gray-900">
                    Worth a second look.
                  </h2>
                </div>
                <span className="rounded-xl bg-green-100 px-3 py-2 text-xl">
                  ♻
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-[#f0f5ed] p-4">
                  <div className="flex h-28 items-center justify-center rounded-xl bg-white text-5xl">
                    🎧
                  </div>
                  <p className="mt-3 text-sm font-bold text-gray-800">
                    Tech finds
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    More for your money
                  </p>
                </div>
                <div className="mt-7 rounded-2xl bg-[#f7f2e9] p-4">
                  <div className="flex h-28 items-center justify-center rounded-xl bg-white text-5xl">
                    📚
                  </div>
                  <p className="mt-3 text-sm font-bold text-gray-800">
                    Everyday essentials
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Ready for a new owner
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 rounded-xl bg-green-50 p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-xl">
                  🌱
                </span>
                <div>
                  <p className="text-sm font-bold text-green-900">
                    Shop thoughtfully
                  </p>
                  <p className="mt-0.5 text-xs leading-5 text-green-800">
                    Reuse more. Waste less. Find what you need.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and categories */}
      <section id="products" className="mx-auto max-w-7xl scroll-mt-24 px-4 pt-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-green-700">
              The ReBuy collection
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900">
              Find something good.
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Browse useful finds listed by our sellers.
            </p>
          </div>
          <p className="text-sm text-gray-500">
            {loading ? "Loading listings..." : `${filteredProducts.length} products found`}
          </p>
        </div>

        <div className="mt-7 flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:p-4">
          <div className="flex flex-1 items-center gap-3 rounded-xl bg-gray-50 px-4 py-3.5 transition focus-within:ring-2 focus-within:ring-green-600">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5 shrink-0 text-gray-400"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m16 16 4 4" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, categories, locations..."
              aria-label="Search products"
              className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-sm font-semibold text-green-700"
              >
                Clear
              </button>
            )}
          </div>

          <Link
            to="/sell"
            className="rounded-xl bg-green-700 px-5 py-3.5 text-center text-sm font-bold text-white transition hover:bg-green-800"
          >
            + List an item
          </Link>
        </div>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                category === item
                  ? "border-green-700 bg-green-700 text-white shadow-sm"
                  : "border-gray-200 bg-white text-gray-600 hover:border-green-300 hover:text-green-800"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Products */}
        <div className="mt-7">
          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="animate-pulse overflow-hidden rounded-2xl border border-gray-100 bg-white p-3"
                >
                  <div className="h-52 rounded-xl bg-gray-100" />
                  <div className="mt-4 h-4 w-3/4 rounded bg-gray-100" />
                  <div className="mt-3 h-4 w-1/2 rounded bg-gray-100" />
                  <div className="mt-5 h-7 w-1/3 rounded bg-gray-100" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-100 bg-white px-5 py-12 text-center">
              <p className="font-semibold text-red-700">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 rounded-xl bg-green-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-green-800"
              >
                Try again
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-3xl">
                🔎
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">
                No products found
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Try another search or choose a different category.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="mt-5 font-bold text-green-700 hover:text-green-900"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <article
                  key={product._id}
                  className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition duration-300 hover:-translate-y-1 hover:border-green-100 hover:shadow-xl hover:shadow-gray-200/60"
                >
                  <div className="relative flex h-56 items-center justify-center overflow-hidden bg-[#f2f5f0]">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-50 to-gray-100 text-6xl text-green-800">
                        ♻
                      </div>
                    )}
                    <span className="absolute left-3 top-3 rounded-full border border-white/80 bg-white/95 px-3 py-1.5 text-xs font-bold text-green-800 shadow-sm">
                      {product.condition || "Pre-owned"}
                    </span>
                  </div>

                  <div className="p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
                      {product.category || "General"}
                    </p>
                    <h3 className="mt-2 line-clamp-1 text-base font-bold text-gray-900">
                      {product.name}
                    </h3>
                    <p className="mt-1.5 min-h-10 text-sm leading-5 text-gray-500 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between gap-2">
                      <p className="text-xl font-extrabold text-gray-900">
                        ₹{money(product.price)}
                      </p>
                      {product.location && (
                        <span className="max-w-[50%] truncate text-xs text-gray-500">
                          <span aria-hidden="true">⌖ </span>
                          {product.location}
                        </span>
                      )}
                    </div>

                    <div className="mt-4 border-t border-gray-100 pt-3">
                      <p className="text-xs font-medium text-gray-400">
                        Listed on ReBuy
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-green-900 px-6 py-10 text-white sm:px-10 lg:px-14 lg:py-12">
          <p className="text-sm font-bold uppercase tracking-widest text-green-300">
            Simple by design
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
            A better way to buy and sell.
          </h2>

          <div className="mt-9 grid gap-8 sm:grid-cols-3">
            {[
              {
                number: "01",
                title: "Discover",
                text: "Browse listings and find products that fit your needs.",
              },
              {
                number: "02",
                title: "Choose",
                text: "Compare details, prices and listed product condition.",
              },
              {
                number: "03",
                title: "Relist or reuse",
                text: "Give useful items another chapter by selling what you no longer need.",
              },
            ].map((step) => (
              <div key={step.number} className="border-t border-green-700 pt-5">
                <p className="text-sm font-bold text-green-300">{step.number}</p>
                <h3 className="mt-3 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-green-100/80">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
