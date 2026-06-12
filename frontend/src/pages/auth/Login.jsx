import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom"; 

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(formData);

      // Save credentials & user state to context
      login({
        access: data.access,
        refresh: data.refresh,
        user: data.user,
      });

      // 1. Log the user object to inspect structure in dev tools
      console.log("User Payload Data:", data.user);

      // 2. Extract role safely handling both Case 1 and Case 2 payload variations
      const roleName = data.user?.role;

      // 3. Conditional route navigation based on user privilege level
      if (roleName === "Admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/employee/timesheets");
      }

    } catch (err) {
      setError(
        err?.response?.data?.detail || 
        "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Timesheet System
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm font-medium">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* ➕ Added Step 5 Registration Interface Trigger Row */}
        <div className="text-center pt-4 mt-4 border-t text-sm text-slate-500">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline font-semibold">
            Register
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;