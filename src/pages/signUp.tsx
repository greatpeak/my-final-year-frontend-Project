/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Robot from "../assets/Graident_Ai_Robot_1-removebg-preview 1.svg";
import Logo from "../assets/Frame 2.svg";
import { API_BASE_URL } from "../base_url";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Check,
  X,
} from "lucide-react";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const passwordsMatch =
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    // Clear error when user starts typing
    if (errorMessage) setErrorMessage("");
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }
    if (formData.password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long!");
      return;
    }
    setErrorMessage("");
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoading(false);
        throw new Error(data.message || "Signup failed");
      }

      // ✅ CRITICAL FIX: Store user data in localStorage immediately after signup
      if (data.user_data) {
        localStorage.setItem("healthUserId", data.user_data.userId);
        localStorage.setItem("healthUserFirstName", data.user_data.firstName);
        localStorage.setItem("healthUserLastName", data.user_data.lastName);
        localStorage.setItem("healthUserEmail", data.user_data.email);
        localStorage.setItem("healthUserAvatar", data.user_data.avatar);

        console.log("✅ User data stored:", {
          firstName: data.user_data.firstName,
          lastName: data.user_data.lastName,
          userId: data.user_data.userId,
        });
      }

      setLoading(false);
      navigate("/verify-email/" + formData.email);
    } catch (error: any) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  };

  const token = localStorage.getItem("healthUserToken");
  if (token) {
    return <Navigate to="/app/health-tips" replace />;
  }

  return (
    <div className="flex relative items-center justify-center min-h-screen bg-gradient-to-br from-[#C0D6E4] via-[#B5CFDF] to-[#A8C8DC] px-4 md:px-0 py-8 overflow-hidden">
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
      <div className="relative z-10 w-full max-w-md md:max-w-2xl">
        {/* Logo */}
        <a href="/" className="hidden md:block absolute left-3 top-3">
          <img
            src={Logo}
            alt="Health Bot Logo"
            className="w-[205px] h-[36px] hover:scale-105 transition-transform duration-300"
          />
        </a>

        {/* Signup Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
          {/* Robot Icon with Glow */}
          <div className="flex justify-center mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#72BEEE] to-[#5AA5D8] blur-2xl opacity-30 rounded-full"></div>
            <img
              src={Robot}
              alt="Robot"
              className="relative w-24 md:w-32 drop-shadow-2xl animate-float"
            />
          </div>

          {/* Welcome Text */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#72BEEE]/10 to-[#5AA5D8]/10 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-[#72BEEE]" />
              <span className="text-sm font-semibold text-[#72BEEE]">
                Join Us Today
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#72BEEE] to-[#5AA5D8] bg-clip-text text-transparent">
              Create your account
            </h2>
            <p className="text-gray-600 mt-2 text-sm">
              Start your health journey with us
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-slideIn">
              <p className="text-sm text-red-700 flex items-center gap-2">
                <X className="w-5 h-5 text-red-500" />
                {errorMessage}
              </p>
            </div>
          )}

          {/* Signup Form */}
          <form className="space-y-5" onSubmit={handleSignup}>
            {/* Name Fields - Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div className="relative">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  First Name
                </label>
                <div className="relative">
                  <div
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                      focusedField === "firstName"
                        ? "text-[#72BEEE]"
                        : "text-gray-400"
                    }`}
                  >
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("firstName")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl transition-all duration-300 focus:outline-none ${
                      focusedField === "firstName"
                        ? "border-[#72BEEE] bg-blue-50/50 shadow-lg shadow-[#72BEEE]/20"
                        : "border-gray-200 bg-gray-50 hover:border-gray-300"
                    }`}
                    required
                  />
                </div>
              </div>

              {/* Last Name */}
              <div className="relative">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Last Name
                </label>
                <div className="relative">
                  <div
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                      focusedField === "lastName"
                        ? "text-[#72BEEE]"
                        : "text-gray-400"
                    }`}
                  >
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("lastName")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl transition-all duration-300 focus:outline-none ${
                      focusedField === "lastName"
                        ? "border-[#72BEEE] bg-blue-50/50 shadow-lg shadow-[#72BEEE]/20"
                        : "border-gray-200 bg-gray-50 hover:border-gray-300"
                    }`}
                    required
                  />
                </div>
              </div>
            </div>

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
                    focusedField === "email"
                      ? "text-[#72BEEE]"
                      : "text-gray-400"
                  }`}
                >
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl transition-all duration-300 focus:outline-none ${
                    focusedField === "email"
                      ? "border-[#72BEEE] bg-blue-50/50 shadow-lg shadow-[#72BEEE]/20"
                      : "border-gray-200 bg-gray-50 hover:border-gray-300"
                  }`}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                    focusedField === "password"
                      ? "text-[#72BEEE]"
                      : "text-gray-400"
                  }`}
                >
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full pl-12 pr-12 py-3.5 border-2 rounded-xl transition-all duration-300 focus:outline-none ${
                    focusedField === "password"
                      ? "border-[#72BEEE] bg-blue-50/50 shadow-lg shadow-[#72BEEE]/20"
                      : "border-gray-200 bg-gray-50 hover:border-gray-300"
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#72BEEE] transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
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
                Confirm Password
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
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("confirmPassword")}
                  onBlur={() => setFocusedField(null)}
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
              {formData.confirmPassword && (
                <div className="mt-2 flex items-center gap-2">
                  {passwordsMatch ? (
                    <>
                      <Check className="w-4 h-4 text-green-500" />
                      <p className="text-xs text-green-600">Passwords match!</p>
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
              disabled={loading}
              className={`group relative w-full py-4 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 ${
                loading
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
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </span>
              {!loading && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="font-semibold text-[#72BEEE] hover:text-[#5AA5D8] hover:underline transition-colors duration-200"
              >
                Log in
              </button>
            </p>
          </div>

          {/* Divider */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <span className="text-xs text-gray-400 font-medium">
              Secure Signup
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white/80 text-xs mt-6">
          By creating an account, you agree to our Terms of Service and Privacy
          Policy
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

export default Signup;
