
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProducts = async () => {
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
    };

    getProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4">
        <h1 className="text-2xl font-bold text-green-700">
          ReBuy
        </h1>
        <p className="text-gray-600">
          Buy smart. Sell what you don't need.
        </p>
      </nav>

      <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">
          Available Products
        </h2>

        {loading && <p>Loading products...</p>}

        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && products.length === 0 && (
          <p className="text-gray-600">
            No products available yet. Check back soon!
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow p-4"
            >
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
              )}

              <h3 className="text-lg font-semibold">
                {product.name}
              </h3>

              <p className="text-gray-600 mt-1">
                {product.description}
              </p>

              <p className="text-green-700 font-bold mt-3">
                ₹{product.price.toLocaleString("en-IN")}
              </p>

              <p className="text-sm text-gray-500 mt-1">
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
      </main>
    </div>
  );
}

export default App;
