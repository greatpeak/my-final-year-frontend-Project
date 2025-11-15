import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/Frame 2.svg";
import { API_BASE_URL } from "../base_url";
import {
  Mail,
  Shield,
  ArrowRight,
  RefreshCw,
  Check,
  Sparkles,
} from "lucide-react";

const VerifyEmail: React.FC = () => {
  const { email } = useParams<{ email: string }>();
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));
  const [loading, setLoading] = useState<boolean>(false);
  const [resendLoading, setResendLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleOtpChange = (value: string, index: number) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(-1);
    setOtp(updatedOtp);
    setError(""); // Clear error when user types

    // Auto-focus next input
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (updatedOtp.every((digit) => digit !== "")) {
      handleSubmit(null, updatedOtp.join(""));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      if (index < 4) newOtp[index] = char;
    });
    setOtp(newOtp);

    // Focus last filled input or first empty
    const nextEmptyIndex = newOtp.findIndex((digit) => !digit);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[3]?.focus();
      handleSubmit(null, newOtp.join(""));
    }
  };

  const handleSubmit = async (e: React.FormEvent | null, otpCode?: string) => {
    if (e) e.preventDefault();

    const code = otpCode || otp.join("");
    if (code.length !== 4) {
      setError("Please complete the 4-digit OTP.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await axios.post(API_BASE_URL + "/verify-email", {
        email,
        otp: code,
      });

      if (response.status === 200) {
        const { user_credentials } = response.data;
        console.log("✅ Verification successful:", user_credentials);

        // ✅ CRITICAL FIX: Store ALL user data including firstName and lastName
        localStorage.setItem("healthUserToken", user_credentials.token);
        localStorage.setItem("healthUserId", user_credentials.userId);
        localStorage.setItem("healthUserFirstName", user_credentials.firstName);
        localStorage.setItem("healthUserLastName", user_credentials.lastName);
        localStorage.setItem("healthUserEmail", user_credentials.email);
        localStorage.setItem("healthUserAvatar", user_credentials.avatar);

        console.log("✅ Stored user data:", {
          firstName: user_credentials.firstName,
          lastName: user_credentials.lastName,
          userId: user_credentials.userId,
        });

        setSuccess(true);
        setTimeout(() => {
          window.location.href = "/app/health-tips";
        }, 1500);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Verification failed", error);
      setError(
        error.response?.data?.message || "Invalid OTP. Please try again."
      );
      setOtp(Array(4).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;

    try {
      setResendLoading(true);
      setError("");
      const response = await axios.post(API_BASE_URL + "/request-otp", {
        email,
      });

      if (response.status === 200) {
        setCountdown(60); // 60 second cooldown
        setOtp(Array(4).fill(""));
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      console.error("Resend code failed", error);
      setError("Failed to resend the code. Please try again.");
    } finally {
      setResendLoading(false);
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
        <a href="/signup" className="hidden md:block absolute left-3 top-3">
          <img
            src={Logo}
            alt="Health Bot Logo"
            className="w-[205px] h-[36px] hover:scale-105 transition-transform duration-300"
          />
        </a>

        {/* Verification Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
          {/* Icon with Glow */}
          <div className="flex justify-center mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#72BEEE] to-[#5AA5D8] blur-2xl opacity-30 rounded-full"></div>
            <div className="relative bg-gradient-to-br from-[#72BEEE] to-[#5AA5D8] p-6 rounded-3xl shadow-xl animate-float">
              {success ? (
                <Check className="w-16 h-16 text-white" strokeWidth={3} />
              ) : (
                <Shield className="w-16 h-16 text-white" strokeWidth={2} />
              )}
            </div>
          </div>

          {/* Header Text */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#72BEEE]/10 to-[#5AA5D8]/10 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-[#72BEEE]" />
              <span className="text-sm font-semibold text-[#72BEEE]">
                Email Verification
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#72BEEE] to-[#5AA5D8] bg-clip-text text-transparent mb-3">
              {success ? "Verified!" : "Verify it's you"}
            </h2>
            <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
              <Mail className="w-4 h-4 text-[#72BEEE]" />
              <p>
                Code sent to{" "}
                <span className="font-semibold text-gray-800">{email}</span>
              </p>
            </div>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg animate-slideIn">
              <p className="text-sm text-green-700 flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                Email verified successfully! Redirecting to your dashboard...
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-slideIn">
              <p className="text-sm text-red-700 flex items-center gap-2">
                <span className="text-red-500 text-lg">⚠</span>
                {error}
              </p>
            </div>
          )}

          {/* OTP Form */}
          <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4 text-center">
                Enter 4-digit verification code
              </label>
              <div className="flex justify-center gap-3 md:gap-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    disabled={loading || success}
                    className={`w-14 h-14 md:w-16 md:h-16 text-center text-2xl font-bold border-2 rounded-xl transition-all duration-300 focus:outline-none ${
                      digit
                        ? "border-[#72BEEE] bg-blue-50 text-[#72BEEE]"
                        : error
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 bg-gray-50 hover:border-gray-400"
                    } ${
                      loading || success ? "opacity-50 cursor-not-allowed" : ""
                    } focus:border-[#72BEEE] focus:bg-blue-50 focus:shadow-lg focus:shadow-[#72BEEE]/20`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500 text-center mt-3">
                💡 Tip: You can paste the entire code
              </p>
            </div>

            {/* Resend Button */}
            <div className="text-center">
              <button
                type="button"
                onClick={handleResendCode}
                disabled={resendLoading || countdown > 0 || success}
                className={`inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 ${
                  countdown > 0 || success
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-[#72BEEE] hover:text-[#5AA5D8] hover:underline"
                }`}
              >
                <RefreshCw
                  className={`w-4 h-4 ${resendLoading ? "animate-spin" : ""}`}
                />
                {countdown > 0
                  ? `Resend code in ${countdown}s`
                  : resendLoading
                  ? "Sending..."
                  : "Resend code"}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || success || otp.some((digit) => !digit)}
              className={`group relative w-full py-4 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 ${
                loading || success || otp.some((digit) => !digit)
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
                    <span>Verifying...</span>
                  </>
                ) : success ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Verified</span>
                  </>
                ) : (
                  <>
                    <span>Verify Email</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </span>
              {!loading && !success && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              )}
            </button>
          </form>

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the code?{" "}
              <a
                href="/signup"
                className="font-semibold text-[#72BEEE] hover:text-[#5AA5D8] hover:underline transition-colors"
              >
                Try again
              </a>
            </p>
          </div>

          {/* Divider */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <span className="text-xs text-gray-400 font-medium">
              Secure Verification
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white/80 text-xs mt-6">
          🔒 Your information is secure and encrypted
        </p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(2deg);
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

        input[type="text"]::-webkit-outer-spin-button,
        input[type="text"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default VerifyEmail;
