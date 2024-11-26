import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Robot from "../assets/Graident_Ai_Robot_1-removebg-preview 1.svg";
import Logo from "../assets/Frame 2.svg";
import { API_BASE_URL } from "../base_url";

const ForgetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/forgot-password`, { email });

      if (response.status === 200) {
        setSuccessMessage("A password reset link has been sent to your email.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
            <span className="text-[#72BEEE]">Forgot password?</span>
          </h2>

          {/* Error or Success message */}
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          {successMessage && <p className="text-sm text-green-500 mt-2">{successMessage}</p>}

          {/* Reset Password Form */}
          <form className="mt-6 space-y-4" onSubmit={handleResetPassword}>
            <div>
              <label htmlFor="email" className="block text-left text-sm font-medium text-white">
                Enter your email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-2 border border-white rounded-md focus:ring-2 focus:ring-[#72BEEE] focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 text-white bg-[#72BEEE] rounded-md hover:bg-blue-500 transition duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        </div>

        <div className="mt-4 text-sm text-white">
          Remember your password?{" "}
          <button
            onClick={() => navigate("/login")}
            className="font-medium text-[#72BEEE] hover:underline"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
