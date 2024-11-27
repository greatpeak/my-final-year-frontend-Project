import React, { FormEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Robot from "../assets/Graident_Ai_Robot_1-removebg-preview 1.svg";
import Logo from "../assets/Frame 2.svg";
import { API_BASE_URL } from "../base_url";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });

      if (response.status === 200) {
        const { user_credentials } = response.data;
        console.log(user_credentials);
        localStorage.setItem("healthUserToken", user_credentials.token);
        localStorage.setItem("healthUserId", user_credentials.userId);
        navigate("/app/health-tips");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const token = localStorage.getItem("healthUserToken");
  if (token) {
    return <Navigate to="/app/health-tips" replace />;
  }

  return (
    <div className="flex relative items-center justify-center min-h-screen bg-[#C0D6E4] px-4 md:px-0">
      <div className="p-6 md:p-12 text-center w-full max-w-md md:max-w-lg">
        {/* Logo and Robot */}
        <div className="space-y-6">
          <a href="/">
            <img
              src={Logo}
              alt="Health Bot Logo"
              className="w-[205px] h-[36px] hidden md:block absolute left-3 top-3"
            />
          </a>

          <img src={Robot} alt="Robot" className="mx-auto w-28 md:w-40" />
        </div>
        <div className="mt-8">
          <h2 className="text-2xl text-left md:text-3xl font-semibold text-white">
            <span className="text-[#72BEEE]">Log in </span>
            <br />
            to your account
          </h2>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          <form className="mt-6 space-y-4" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-left text-sm font-medium text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="w-full px-4 py-2 border border-white rounded-md focus:ring-2 focus:ring-[#72BEEE] focus:outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-left text-sm font-medium text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="w-full px-4 py-2 border border-white rounded-md focus:ring-2 focus:ring-[#72BEEE] focus:outline-none"
                required
              />
            </div>
            <div className="text-right">
              <button
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-white hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 text-white bg-[#72BEEE] rounded-md hover:bg-blue-500 transition duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Logging in..." : "Continue"}
            </button>
          </form>
        </div>

        <div className="mt-4 text-sm text-white">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="font-medium text-[#72BEEE] hover:underline"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
