
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/auth/register";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
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

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      await axios.post(API_URL, {
        ...form,
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
      });

      alert("Registration successful! Please login.");
      navigate("/login");

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Registration failed. Please try again."
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
              Join the ReBuy community.
            </h1>

            <p className="mt-5 leading-7 text-green-100">
              Discover great pre-owned products, sell things you no longer
              need, and give useful items a second life.
            </p>
          </div>

          <p className="text-sm text-green-200">
            Buy smart. Sell easy. Reuse more.
          </p>
        </div>

        {/* Registration form */}
        <div className="p-6 sm:p-10">
          <p className="text-sm font-bold uppercase tracking-widest text-green-700">
            Create account
          </p>

          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
            Get started
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Enter your details to create your ReBuy account.
          </p>

          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Full name *
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Email address *
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
                Password *
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
                className={inputClass}
                minLength={6}
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Phone number
              </label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Address
              </label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter your city or address"
                className={`${inputClass} resize-none`}
                rows={2}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-green-700 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-green-800 disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account →"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-green-700 hover:text-green-900"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Register;
