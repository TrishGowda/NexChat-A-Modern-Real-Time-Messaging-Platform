import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Toast from "../common/Toast";

function SignupForm() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!formData.username.trim()) {
      setError("Please enter a username.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setError("");

    const result = await signup(formData.username.trim(), formData.password);

    setLoading(false);

    if (result.success) {
      setSuccess(result.message || "Account created! Redirecting to login...");
      setTimeout(() => navigate("/login", { replace: true }), 1200);
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111b21] px-4">
      {error && (
        <Toast message={error} type="error" onClose={() => setError("")} />
      )}
      {success && (
        <Toast message={success} type="success" onClose={() => setSuccess("")} />
      )}

      <div className="bg-[#202c33] p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-[#00a884] flex items-center justify-center text-white text-2xl font-bold">
            C
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-center mb-1 text-gray-100">
          Create account
        </h1>
        <p className="text-center text-gray-400 mb-6 text-sm">
          Sign up to start chatting
        </p>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            autoComplete="username"
            className="w-full bg-[#2a3942] text-gray-100 placeholder-gray-500 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#00a884]"
          />

          <input
            type="password"
            name="password"
            placeholder="Password (min. 6 characters)"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            className="w-full bg-[#2a3942] text-gray-100 placeholder-gray-500 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#00a884]"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00a884] text-white p-3 rounded-lg hover:bg-[#02906f] disabled:opacity-60 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-[#00a884] font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupForm;