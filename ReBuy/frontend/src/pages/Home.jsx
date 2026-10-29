
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/products"
        );
        setProducts(res.data);
      } catch (err) {
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-6 text-2xl font-bold">
          Available Products
        </h2>

        {loading && <p>Loading products...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && products.length === 0 && (
          <p>No products available yet. Check back soon!</p>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product._id}
              className="rounded-xl bg-white p-4 shadow"
            >
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="mb-3 h-48 w-full rounded-lg object-cover"
                />
              )}

              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="mt-1 text-gray-600">{product.description}</p>

              <p className="mt-3 font-bold text-green-700">
                ₹{Number(product.price).toLocaleString("en-IN")}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {product.category} · {product.condition}
              </p>

              {product.location && (
                <p className="text-sm text-gray-500">
                  Location: {product.location}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Home;
