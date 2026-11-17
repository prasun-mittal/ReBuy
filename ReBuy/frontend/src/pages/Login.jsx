
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/auth/login";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await axios.post(API_URL, {
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      // Save JWT token and user details
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-600/10";

  return (
    <main className="flex min-h-[75vh] items-center justify-center px-4 py-8">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl md:grid-cols-2">

        {/* Left section */}
        <div className="hidden flex-col justify-between bg-green-900 p-8 text-white md:flex">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-2xl font-bold">
              R
            </div>

            <h1 className="mt-12 text-4xl font-extrabold leading-tight">
              Welcome back to ReBuy.
            </h1>

            <p className="mt-5 leading-7 text-green-100">
              Sign in to manage your listings and discover great
              pre-owned products.
            </p>
          </div>

          <p className="text-sm text-green-200">
            Buy smart. Sell easy. Reuse more.
          </p>
        </div>

        {/* Login form */}
        <div className="p-6 sm:p-10">
          <p className="text-sm font-bold uppercase tracking-widest text-green-700">
            Welcome back
          </p>

          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
            Login to your account
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Enter your registered email and password.
          </p>

          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Email address
              </label>

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Password
              </label>

              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={inputClass}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-green-700 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-green-800 disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login →"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-green-700 hover:text-green-900"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Login;