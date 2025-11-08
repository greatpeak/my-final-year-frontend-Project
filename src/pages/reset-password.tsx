import React, { FormEvent, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Robot from "../assets/Graident_Ai_Robot_1-removebg-preview 1.svg";
import Logo from "../assets/Frame 2.svg";
import { API_BASE_URL } from "../base_url";
import {
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  X,
  KeyRound,
  AlertCircle,
  Sparkles,
  Shield,
} from "lucide-react";

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
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(newPassword);
  const passwordsMatch =
    newPassword && confirmPassword && newPassword === confirmPassword;

  useEffect(() => {
    if (!code) {
      setError("Invalid or expired reset code.");
    }
  }, [code]);

  const handleResetPassword = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/reset-password`, {
        otp: code,
        password: newPassword,
        email,
      });

      if (response.status === 200) {
        setSuccessMessage("Your password has been successfully reset.");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex relative items-center justify-center min-h-screen bg-gradient-to-br from-[#C0D6E4] via-[#B5CFDF] to-[#A8C8DC] px-4 md:px-0 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#72BEEE]/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md md:max-w-lg">
        {/* Logo */}
        <a href="/" className="hidden md:block absolute left-3 top-3">
          <img
            src={Logo}
            alt="Health Bot Logo"
            className="w-[205px] h-[36px] hover:scale-105 transition-transform duration-300"
          />
        </a>

        {/* Reset Password Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
          {/* Robot Icon with Glow */}
          <div className="flex justify-center mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#72BEEE] to-[#5AA5D8] blur-2xl opacity-30 rounded-full"></div>
            {successMessage ? (
              <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-3xl shadow-xl animate-float">
                <Check className="w-16 h-16 text-white" strokeWidth={3} />
              </div>
            ) : error && !code ? (
              <div className="relative bg-gradient-to-br from-red-500 to-rose-600 p-6 rounded-3xl shadow-xl animate-float">
                <AlertCircle className="w-16 h-16 text-white" strokeWidth={2} />
              </div>
            ) : (
              <img
                src={Robot}
                alt="Robot"
                className="relative w-28 md:w-36 drop-shadow-2xl animate-float"
              />
            )}
          </div>

          {/* Header Text */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#72BEEE]/10 to-[#5AA5D8]/10 px-4 py-2 rounded-full mb-4">
              <KeyRound className="w-4 h-4 text-[#72BEEE]" />
              <span className="text-sm font-semibold text-[#72BEEE]">
                {successMessage
                  ? "Success"
                  : error && !code
                  ? "Invalid Link"
                  : "Password Reset"}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#72BEEE] to-[#5AA5D8] bg-clip-text text-transparent mb-3">
              {successMessage
                ? "Password Updated!"
                : error && !code
                ? "Link Expired"
                : "Reset Your Password"}
            </h2>
            <p className="text-gray-600 text-sm">
              {successMessage
                ? "You can now log in with your new password"
                : error && !code
                ? "This reset link is invalid or has expired"
                : email
                ? `Resetting password for ${email}`
                : "Create a new secure password"}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-slideIn">
              <p className="text-sm text-red-700 flex items-center gap-2">
                <X className="w-5 h-5 text-red-500" />
                {error}
              </p>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg animate-slideIn">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="p-1 bg-green-500 rounded-full">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-green-800 mb-1">
                    Password Reset Successful!
                  </p>
                  <p className="text-sm text-green-700">{successMessage}</p>
                  <p className="text-xs text-green-600 mt-2">
                    Redirecting to login...
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Reset Password Form */}
          {!successMessage && code && (
            <form className="space-y-5" onSubmit={handleResetPassword}>
              {/* New Password Input */}
              <div className="relative">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  New Password
                </label>
                <div className="relative">
                  <div
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                      focusedField === "newPassword"
                        ? "text-[#72BEEE]"
                        : "text-gray-400"
                    }`}
                  >
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setError(null);
                    }}
                    onFocus={() => setFocusedField("newPassword")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter new password"
                    className={`w-full pl-12 pr-12 py-3.5 border-2 rounded-xl transition-all duration-300 focus:outline-none ${
                      focusedField === "newPassword"
                        ? "border-[#72BEEE] bg-blue-50/50 shadow-lg shadow-[#72BEEE]/20"
                        : "border-gray-200 bg-gray-50 hover:border-gray-300"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#72BEEE] transition-colors duration-200"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {newPassword && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            passwordStrength >= level
                              ? passwordStrength === 1
                                ? "bg-red-500"
                                : passwordStrength === 2
                                ? "bg-orange-500"
                                : passwordStrength === 3
                                ? "bg-yellow-500"
                                : "bg-green-500"
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-600">
                      {passwordStrength === 0 && "Enter a password"}
                      {passwordStrength === 1 && "🔴 Weak password"}
                      {passwordStrength === 2 && "🟠 Fair password"}
                      {passwordStrength === 3 && "🟡 Good password"}
                      {passwordStrength === 4 && "🟢 Strong password"}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="relative">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Confirm New Password
                </label>
                <div className="relative">
                  <div
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                      focusedField === "confirmPassword"
                        ? "text-[#72BEEE]"
                        : "text-gray-400"
                    }`}
                  >
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setError(null);
                    }}
                    onFocus={() => setFocusedField("confirmPassword")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Confirm new password"
                    className={`w-full pl-12 pr-12 py-3.5 border-2 rounded-xl transition-all duration-300 focus:outline-none ${
                      focusedField === "confirmPassword"
                        ? "border-[#72BEEE] bg-blue-50/50 shadow-lg shadow-[#72BEEE]/20"
                        : "border-gray-200 bg-gray-50 hover:border-gray-300"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#72BEEE] transition-colors duration-200"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Password Match Indicator */}
                {confirmPassword && (
                  <div className="mt-2 flex items-center gap-2">
                    {passwordsMatch ? (
                      <>
                        <Check className="w-4 h-4 text-green-500" />
                        <p className="text-xs text-green-600">
                          Passwords match!
                        </p>
                      </>
                    ) : (
                      <>
                        <X className="w-4 h-4 text-red-500" />
                        <p className="text-xs text-red-600">
                          Passwords don't match
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !newPassword || !confirmPassword}
                className={`group relative w-full py-4 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 ${
                  loading || !newPassword || !confirmPassword
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#72BEEE] to-[#5AA5D8] hover:from-[#5AA5D8] hover:to-[#4A9AC8] shadow-lg hover:shadow-xl hover:shadow-[#72BEEE]/50 transform hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <div className="flex gap-1">
                        <div
                          className="w-2 h-2 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                      <span>Resetting Password...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      <span>Reset Password</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </span>
                {!loading && newPassword && confirmPassword && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                )}
              </button>
            </form>
          )}

          {/* Action Buttons for Invalid Link */}
          {error && !code && (
            <div className="space-y-3">
              <button
                onClick={() => navigate("/forgot-password")}
                className="group relative w-full py-4 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 bg-gradient-to-r from-[#72BEEE] to-[#5AA5D8] hover:from-[#5AA5D8] hover:to-[#4A9AC8] shadow-lg hover:shadow-xl hover:shadow-[#72BEEE]/50 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>Request New Link</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>

              <button
                onClick={() => navigate("/login")}
                className="w-full py-3 text-gray-700 font-medium rounded-xl border-2 border-gray-200 hover:border-[#72BEEE] hover:bg-blue-50 transition-all duration-200"
              >
                Back to Login
              </button>
            </div>
          )}

          {/* Login Link */}
          {!successMessage && code && (
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Remembered your password?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="font-semibold text-[#72BEEE] hover:text-[#5AA5D8] hover:underline transition-colors duration-200"
                >
                  Log in
                </button>
              </p>
            </div>
          )}

          {/* Success Button */}
          {successMessage && (
            <button
              onClick={() => navigate("/login")}
              className="group relative w-full py-4 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 bg-gradient-to-r from-[#72BEEE] to-[#5AA5D8] hover:from-[#5AA5D8] hover:to-[#4A9AC8] shadow-lg hover:shadow-xl hover:shadow-[#72BEEE]/50 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span>Go to Login</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          )}

          {/* Divider */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <span className="text-xs text-gray-400 font-medium">
              Secure Reset
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>

          {/* Help Text */}
          {!successMessage && code && (
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="p-1 bg-[#72BEEE] rounded-full">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="text-xs text-gray-600">
                  <p className="font-semibold text-gray-800 mb-1">
                    Password Requirements
                  </p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>At least 8 characters long</li>
                    <li>Mix of uppercase and lowercase letters</li>
                    <li>Include numbers and special characters</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-white/80 text-xs mt-6">
          🔒 Your new password will be encrypted and stored securely
        </p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ResetPassword;
