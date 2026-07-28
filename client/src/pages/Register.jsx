import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserGraduate, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================
  // Validation
  // ==========================
  const validateForm = () => {
    console.log("Name:", formData.name);
    console.log("Email:", formData.email);
    console.log("Password:", formData.password);
    console.log("Confirm Password:", formData.confirmPassword);

    if (!formData.name.trim()) {
      console.log("❌ Name Failed");
      toast.error("Name is required");
      return false;
    }

    if (!formData.email.trim()) {
      console.log("❌ Email Failed");
      toast.error("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      console.log("❌ Email Regex Failed");
      toast.error("Enter a valid email");
      return false;
    }

    if (formData.password.length < 6) {
      console.log("❌ Password Length Failed");
      toast.error("Password must be at least 6 characters");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      console.log("❌ Password Match Failed");
      toast.error("Passwords do not match");
      return false;
    }

    console.log("✅ Validation Passed");
    return true;
  };

  // ==========================
  // Submit
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submit Clicked");

    if (!validateForm()) {
      console.log("Validation Failed");
      return;
    }

    console.log("Validation Passed Successfully");
    console.log("Calling API...");

    try {
      setLoading(true);

      const response = await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      console.log("API Success:", response.data);

      toast.success(
        response.data.message || "Registration Successful"
      );

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.error("REGISTER ERROR:", error);

      if (error.response) {
        console.log("Backend Response:", error.response.data);
      }

      toast.error(
        error.response?.data?.message || "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8">

        <div className="flex justify-center mb-6">
          <FaUserGraduate className="text-cyan-400 text-5xl" />
        </div>

        <h2 className="text-3xl font-bold text-center text-white">
          Create Account
        </h2>

        <p className="text-center text-slate-400 mt-2 mb-8">
          Register to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-lg text-white font-semibold transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        <p className="text-center text-slate-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-400 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;