import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import api from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!password.trim()) {
      toast.error("Password is required");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      toast.success(response.data.message || "Login Successful");

      // Save Token
      localStorage.setItem("token", response.data.token);

      // Save User (if backend returns it)
      if (response.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );
      }

      // Clear Inputs
      setEmail("");
      setPassword("");

      // Redirect
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid Email or Password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

      <Card>

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-cyan-400">
            Admission Calling Agent
          </h1>

          <p className="text-slate-400 mt-2">
            AI Powered College Admission System
          </p>

        </div>

        <div className="space-y-5">

          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<FaEnvelope />}
          />

          <Input
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<FaLock />}
            rightIcon={showPassword ? <FaEyeSlash /> : <FaEye />}
            onRightIconClick={() =>
              setShowPassword(!showPassword)
            }
          />

          <Button
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <div className="text-center">

            <p className="text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-cyan-400 hover:underline"
              >
                Register
              </Link>
            </p>

          </div>

        </div>

      </Card>

    </div>
  );
};

export default Login;