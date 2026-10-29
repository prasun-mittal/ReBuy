import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const API_URL = "http://localhost:5000/api/products";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(`${API_URL}/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError(
          err.response?.status === 404
            ? "Product not found."
            : "Unable to load product. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16">
        <div className="animate-pulse rounded-2xl bg-gray-200 p-20" />
        <p className="mt-4 text-center text-gray-500">Loading product...</p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          {error || "Product not found"}
        </h1>
        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
        >
          Back to Home
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        to="/"
        className="text-sm font-semibold text-green-700 hover:text-green-900"
      >
        ← Back to marketplace
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="flex min-h-80 items-center justify-center overflow-hidden rounded-3xl border border-gray-100 bg-white p-4 sm:min-h-[480px]">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="max-h-[480px] w-full rounded-2xl object-contain"
            />
          ) : (
            <div className="flex h-80 w-full items-center justify-center rounded-2xl bg-green-50 text-7xl">
              ♻
            </div>
          )}
        </div>

        <section className="py-2">
          <span className="inline-block rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-800">
            {product.condition} condition
          </span>

          <p className="mt-5 text-sm font-bold uppercase tracking-widest text-green-700">
            {product.category}
          </p>

          <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl">
            {product.name}
          </h1>

          <p className="mt-5 text-3xl font-extrabold text-green-800">
            ₹
            {Number(product.price || 0).toLocaleString("en-IN")}
          </p>

          <div className="mt-7 border-y border-gray-100 py-6">
            <h2 className="text-base font-bold text-gray-900">
              Product description
            </h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-gray-600">
              {product.description}
            </p>

            {product.location && (
              <div className="mt-5 flex items-start gap-3">
                <span className="text-xl" aria-hidden="true">⌖</span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Listed location
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.location}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-5">
            <h2 className="font-bold text-gray-900">
              Interested in this item?
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              This listing is available to explore. Seller contact details
              and messaging will be added when the seller and inquiry
              functionality is connected.
            </p>
            <Link
              to="/"
              className="mt-5 block rounded-xl bg-green-700 px-5 py-3.5 text-center text-sm font-bold text-white transition hover:bg-green-800"
            >
              Continue exploring
            </Link>
          </div>

          <p className="mt-5 text-xs leading-5 text-gray-400">
            Please confirm the item's condition and details with the seller
            before arranging a purchase.
          </p>
        </section>
      </div>
    </main>
  );
}

export default ProductDetails;