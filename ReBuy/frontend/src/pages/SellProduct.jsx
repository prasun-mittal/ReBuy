import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/products";

const initialForm = {
  name: "",
  description: "",
  price: "",
  category: "Electronics",
  condition: "Good",
  location: "",
  imageUrl: "",
};

function SellProduct() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const updateForm = (e) => {
        const { name, value } = e.target;

        // Allow only digits and one decimal point in price
        if (name === "price" && !/^\d*\.?\d*$/.test(value)) {
          return;
        }

        setForm((prev) => ({
          ...prev,
          [name]: value,
        }));
      };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (
      !form.name.trim() ||
      !form.description.trim() ||
      !form.category.trim() ||
      !form.condition
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (form.price.trim() === "" || !/^\d+(\.\d+)?$/.test(form.price) || !Number.isFinite(Number(form.price)) || Number(form.price) < 0) {
      setError("Please enter a valid, non-negative price.");
      return;
    }

    if (form.imageUrl.trim()) {
      try {
        const url = new URL(form.imageUrl.trim());
        if (url.protocol !== "http:" && url.protocol !== "https:") {
          throw new Error("Invalid URL");
        }
      } catch {
        setError("Please enter a valid image URL beginning with http:// or https://.");
        return;
      }
    }

    try {
      setSubmitting(true);

      const product = {
        ...form,
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        category: form.category.trim(),
        location: form.location.trim(),
        imageUrl: form.imageUrl.trim(),
      };

      await axios.post(API_URL, product);

      setMessage("Your product has been listed successfully!");

      setForm(initialForm);

      // Let the user see the success message before returning home.
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to list your product. Please check that the backend is running."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-600/10";

  return (
    <main className="min-h-[80vh] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-green-700"
        >
          <span>←</span> Back to marketplace
        </Link>

        <div className="mt-7 grid items-start gap-8 lg:grid-cols-[1fr_340px]">
          <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
            <div className="bg-green-900 px-6 py-8 text-white sm:px-9 sm:py-10">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl">
                  +
                </span>
                <div>
                  <p className="text-sm font-semibold text-green-200">
                    SELL ON REBUY
                  </p>
                  <h1 className="mt-1 text-2xl font-extrabold sm:text-3xl">
                    List your product
                  </h1>
                </div>
              </div>
              <p className="mt-4 max-w-xl text-sm leading-6 text-green-100/80">
                Give your pre-loved item a new home. Add accurate details so
                buyers know exactly what you're offering.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-9">
              {message && (
                <div
                  role="status"
                  className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-800"
                >
                  {message}
                </div>
              )}

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                >
                  {error}
                </div>
              )}

              <div>
                <h2 className="text-base font-bold text-gray-900">
                  Product information
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Start with the basics of your listing.
                </p>
              </div>

              <div>
                <label htmlFor="name" className="text-sm font-semibold text-gray-700">
                  Product name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={updateForm}
                  placeholder="e.g. Wireless headphones"
                  className={inputClass}
                  maxLength={100}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="text-sm font-semibold text-gray-700"
                >
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={updateForm}
                  placeholder="Describe the product, its features and any signs of use..."
                  className={`${inputClass} min-h-32 resize-y`}
                  maxLength={2000}
                  required
                  rows={4}
                />
                <p className="mt-1 text-right text-xs text-gray-400">
                  {form.description.length}/2000
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="price"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Asking price (₹) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-[23px] -translate-y-1/2 text-sm font-semibold text-gray-500">
                      ₹
                    </span>
                    <input
                      id="price"
                      name="price"
                      type="text"
                      inputMode="decimal"
                      value={form.price}
                      onChange={updateForm}
                      placeholder="2500"
                      className={`${inputClass} pl-9`}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={form.category}
                    onChange={updateForm}
                    className={inputClass}
                    required
                  >
                    <option>Electronics</option>
                    <option>Mobiles</option>
                    <option>Fashion</option>
                    <option>Furniture</option>
                    <option>Books</option>
                    <option>Home Appliances</option>
                    <option>Sports</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="condition"
                  className="text-sm font-semibold text-gray-700"
                >
                  Product condition <span className="text-red-500">*</span>
                </label>
                <div className="mt-2 grid grid-cols-3 gap-3">
                  {["Like New", "Good", "Fair"].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({ ...prev, condition: item }))
                      }
                      className={`rounded-xl border px-2 py-3 text-sm font-semibold transition ${
                        form.condition === item
                          ? "border-green-700 bg-green-50 text-green-800 ring-2 ring-green-700/10"
                          : "border-gray-200 bg-white text-gray-600 hover:border-green-300"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="text-sm font-semibold text-gray-700"
                >
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  value={form.location}
                  onChange={updateForm}
                  placeholder="e.g. Mathura, Uttar Pradesh"
                  className={inputClass}
                  maxLength={150}
                />
                <p className="mt-1.5 text-xs text-gray-400">
                  Add a general location to help buyers discover your listing.
                </p>
              </div>

              <div>
                <label
                  htmlFor="imageUrl"
                  className="text-sm font-semibold text-gray-700"
                >
                  Product image URL
                </label>
                <input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  value={form.imageUrl}
                  onChange={updateForm}
                  placeholder="https://example.com/product-image.jpg"
                  className={inputClass}
                />

                {form.imageUrl.trim() && (
                  <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-2">
                    <img
                      src={form.imageUrl}
                      alt="Product preview"
                      className="h-48 w-full rounded-lg object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                      onLoad={(e) => {
                        e.currentTarget.style.display = "block";
                      }}
                    />
                  </div>
                )}

                <p className="mt-1.5 text-xs text-gray-400">
                  Paste a publicly accessible image URL. File uploads are not
                  configured in this version.
                </p>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-xl bg-green-700 px-6 py-4 text-sm font-bold text-white shadow-md shadow-green-900/10 transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Publishing product..." : "Publish product →"}
                </button>
                <p className="mt-3 text-center text-xs leading-5 text-gray-400">
                  Please ensure your product details and condition are accurate.
                </p>
              </div>
            </form>
          </section>

          <aside className="space-y-5 lg:sticky lg:top-28">
            <div className="rounded-3xl border border-green-100 bg-[#edf5ec] p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                🌱
              </div>
              <h2 className="mt-4 text-xl font-extrabold text-gray-900">
                Good for you. Better for reuse.
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Selling things you no longer need can help them find a new
                owner instead of going unused.
              </p>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="font-bold text-gray-900">Tips for a great listing</h2>
              <ul className="mt-5 space-y-4">
                {[
                  ["01", "Use a clear title", "Name the product and model if relevant."],
                  ["02", "Be honest", "Describe wear, defects and condition accurately."],
                  ["03", "Set a fair price", "Consider the item's age and condition."],
                  ["04", "Add a useful image", "Use a clear image of the actual item."],
                ].map(([number, title, text]) => (
                  <li key={number} className="flex gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-50 text-xs font-bold text-green-800">
                      {number}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{title}</p>
                      <p className="mt-1 text-xs leading-5 text-gray-500">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default SellProduct;