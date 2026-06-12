import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../services/authService";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    password_confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Fast Frontend Confirmation Validation Pass
    if (formData.password !== formData.password_confirm) {
      setErrors({ password_confirm: ["Passwords do not match."] });
      return;
    }

    try {
      setLoading(true);
      const data = await registerUser(formData);
      setSuccessMsg(data.message || "Account created successfully!");
      
      // Delay to allow the user to read the success notice before sliding back to sign-in
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        setErrors(err.response.data);
      } else {
        setErrors({ global: "Network pipeline exception triggered. Try again later." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Timesheet System</h2>
          <p className="text-sm text-slate-400 mt-1">Register New Portal Profile</p>
        </div>

        {successMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl text-center font-medium animate-pulse">
            🎉 {successMsg}
          </div>
        )}

        {errors.global && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl text-center font-medium">
            ⚠️ {errors.global}
          </div>
        )}

        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">First Name</label>
              <input
                type="text"
                name="first_name"
                required
                value={formData.first_name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-xl text-sm bg-slate-50 focus:ring-2 focus:ring-indigo-500 transition-shadow outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Last Name</label>
              <input
                type="text"
                name="last_name"
                required
                value={formData.last_name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-xl text-sm bg-slate-50 focus:ring-2 focus:ring-indigo-500 transition-shadow outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Corporate Username</label>
            <div className="flex rounded-xl overflow-hidden border bg-slate-50 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-shadow">
              <input
                type="text"
                name="username"
                required
                placeholder="john.doe"
                value={formData.username}
                onChange={handleInputChange}
                className="flex-1 px-3 py-2 text-sm bg-transparent border-none outline-none text-slate-800 placeholder-slate-300"
              />
              <span className="bg-slate-200 px-3 py-2 text-sm font-medium text-slate-500 select-none border-l flex items-center">
                @orangedatatech.com
              </span>
            </div>
            {errors.username && <p className="text-red-500 text-xs mt-1 font-medium">{errors.username[0]}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-xl text-sm bg-slate-50 focus:ring-2 focus:ring-indigo-500 transition-shadow outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Confirm Password</label>
            <input
              type="password"
              name="password_confirm"
              required
              value={formData.password_confirm}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-xl text-sm bg-slate-50 focus:ring-2 focus:ring-indigo-500 transition-shadow outline-none ${errors.password_confirm ? 'border-red-400' : ''}`}
            />
            {errors.password_confirm && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password_confirm[0]}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold text-sm rounded-xl shadow-md transition-colors pt-3"
          >
            {loading ? "Creating System Profile..." : "Create Account"}
          </button>
        </form>

        <div className="text-center pt-3 border-t text-sm text-slate-500">
          Already have a corporate profile?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline font-semibold">
            Login
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Register;