import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Robot from "../assets/Graident_Ai_Robot_1-removebg-preview 1.svg";
import { API_BASE_URL } from "../base_url";
import {
  Mail,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  Check,
  Sparkles,
  Send,
} from "lucide-react";

const ForgetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<boolean>(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleResetPassword = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/forgot-password`, {
        email,
      });

      if (response.status === 200) {
        setSuccessMessage("A password reset link has been sent to your email.");
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
        {/* Back Button */}
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors duration-200 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="text-sm font-medium">Back to Login</span>
        </button>

        {/* Reset Password Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
          {/* Robot Icon with Glow */}
          <div className="flex justify-center mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#72BEEE] to-[#5AA5D8] blur-2xl opacity-30 rounded-full"></div>
            {successMessage ? (
              <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-3xl shadow-xl animate-float">
                <Check className="w-16 h-16 text-white" strokeWidth={3} />
              </div>
            ) : (
              <>
                <img
                  src={Robot}
                  alt="Robot"
                  className="relative w-28 md:w-36 drop-shadow-2xl animate-float"
                />
              </>
            )}
          </div>

          {/* Header Text */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#72BEEE]/10 to-[#5AA5D8]/10 px-4 py-2 rounded-full mb-4">
              <KeyRound className="w-4 h-4 text-[#72BEEE]" />
              <span className="text-sm font-semibold text-[#72BEEE]">
                Password Recovery
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#72BEEE] to-[#5AA5D8] bg-clip-text text-transparent mb-3">
              {successMessage ? "Check Your Email" : "Forgot Password?"}
            </h2>
            <p className="text-gray-600 text-sm">
              {successMessage
                ? "We've sent you instructions to reset your password"
                : "No worries, we'll send you reset instructions"}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-slideIn">
              <p className="text-sm text-red-700 flex items-center gap-2">
                <span className="text-red-500 text-lg">⚠</span>
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
                    Email Sent Successfully!
                  </p>
                  <p className="text-sm text-green-700">{successMessage}</p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-green-600">
                    <Mail className="w-4 h-4" />
                    <span>
                      Sent to: <span className="font-semibold">{email}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reset Password Form */}
          {!successMessage && (
            <form className="space-y-6" onSubmit={handleResetPassword}>
              {/* Email Input */}
              <div className="relative">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                      focusedField ? "text-[#72BEEE]" : "text-gray-400"
                    }`}
                  >
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(null);
                    }}
                    onFocus={() => setFocusedField(true)}
                    onBlur={() => setFocusedField(false)}
                    placeholder="you@example.com"
                    className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl transition-all duration-300 focus:outline-none ${
                      focusedField
                        ? "border-[#72BEEE] bg-blue-50/50 shadow-lg shadow-[#72BEEE]/20"
                        : "border-gray-200 bg-gray-50 hover:border-gray-300"
                    }`}
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Enter the email address associated with your account
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !email}
                className={`group relative w-full py-4 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 ${
                  loading || !email
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
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Reset Link</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </span>
                {!loading && email && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                )}
              </button>
            </form>
          )}

          {/* Action Buttons After Success */}
          {successMessage && (
            <div className="space-y-3">
              <button
                onClick={() => navigate("/login")}
                className="group relative w-full py-4 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 bg-gradient-to-r from-[#72BEEE] to-[#5AA5D8] hover:from-[#5AA5D8] hover:to-[#4A9AC8] shadow-lg hover:shadow-xl hover:shadow-[#72BEEE]/50 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>Back to Login</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>

              <button
                onClick={() => {
                  setSuccessMessage(null);
                  setEmail("");
                }}
                className="w-full py-3 text-gray-700 font-medium rounded-xl border-2 border-gray-200 hover:border-[#72BEEE] hover:bg-blue-50 transition-all duration-200"
              >
                Resend Email
              </button>
            </div>
          )}

          {/* Login Link */}
          {!successMessage && (
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Remember your password?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="font-semibold text-[#72BEEE] hover:text-[#5AA5D8] hover:underline transition-colors duration-200"
                >
                  Log in
                </button>
              </p>
            </div>
          )}

          {/* Divider */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <span className="text-xs text-gray-400 font-medium">
              Secure Recovery
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>

          {/* Help Text */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="p-1 bg-[#72BEEE] rounded-full">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
              <div className="text-xs text-gray-600">
                <p className="font-semibold text-gray-800 mb-1">Need help?</p>
                <p>
                  If you don't receive an email within a few minutes, check your
                  spam folder or try again.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white/80 text-xs mt-6">
          🔒 Password reset links are valid for 1 hour
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

export default ForgetPassword;
