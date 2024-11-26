import React, { FormEvent, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Robot from "../assets/Graident_Ai_Robot_1-removebg-preview 1.svg";
import Logo from "../assets/Frame 2.svg";
import { API_BASE_URL } from "../base_url";


const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const code = query.get("code");
   const email = query.get("email");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!code) {
      setError("Invalid or expired reset code.");
    }
  }, [code]);

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/reset-password`, {
        token: code,
        password: newPassword,
        email,
      });

      if (response.status === 200) {
        setSuccessMessage("Your password has been successfully reset.");
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
            <span className="text-[#72BEEE]">Reset your password</span>
          </h2>

          {/* Error or Success message */}
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          {successMessage && <p className="text-sm text-green-500 mt-2">{successMessage}</p>}

          {/* Reset Password Form */}
          <form className="mt-6 space-y-4" onSubmit={handleResetPassword}>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-left text-sm font-medium text-white"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                className="w-full px-4 py-2 border border-white rounded-md focus:ring-2 focus:ring-[#72BEEE] focus:outline-none"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-left text-sm font-medium text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
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
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>

        <div className="mt-4 text-sm text-white">
          Remembered your password?{" "}
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

export default ResetPassword;
