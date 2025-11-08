import Robot from "../assets/Graident_Ai_Robot_1-removebg-preview 1.svg";
import Logo from "../assets/Ellipse 2 (1).svg";
import { Navigate, NavLink } from "react-router-dom";
import { ArrowRight, Sparkles, Heart, Shield, Zap } from "lucide-react";
import { useEffect } from "react";

export default function GetStarted() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const token = localStorage.getItem("healthUserToken");
  if (token) {
    return <Navigate to="/app/health-tips" replace />;
  }

  return (
    <div className="flex items-center pb-8 justify-center min-h-screen bg-gradient-to-br from-[#C0D6E4] via-[#B5CFDF] to-[#A8C8DC] px-4 md:px-0 overflow-hidden relative">
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
      <div className="relative z-10 text-center space-y-12 md:max-w-[700px] w-full">
        {/* Logo and Robot Section */}
        <div className="space-y-8">
          {/* Logo with glow */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-white/30 rounded-full blur-2xl"></div>
            <img
              src={Logo}
              alt="Health Bot Logo"
              className="relative mx-auto w-[149px] md:w-48 drop-shadow-2xl animate-float"
            />
          </div>

          {/* Robot with enhanced glow */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-[#72BEEE] to-[#5AA5D8] blur-3xl opacity-40"></div>
            <img
              src={Robot}
              alt="Robot Illustration"
              className="relative mx-auto w-32 md:w-44 drop-shadow-2xl animate-float-delayed"
            />
          </div>

          {/* Welcome Text */}
          <div className="space-y-4 animate-fadeInUp">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/30 shadow-lg">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white">
                AI-Powered Health Assistant
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
              Welcome to
              <br />
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Your Health Journey
              </span>
            </h1>

            <p className="text-white/90 text-base md:text-lg max-w-md mx-auto leading-relaxed">
              Get personalized health tips and chat with your AI health
              companion
            </p>
          </div>
        </div>

        {/* Feature Pills */}
        <div
          className="flex flex-wrap justify-center gap-3 animate-fadeInUp"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
            <Heart className="w-4 h-4 text-white" />
            <span className="text-xs font-medium text-white">
              Personalized Tips
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
            <Shield className="w-4 h-4 text-white" />
            <span className="text-xs font-medium text-white">
              Secure & Private
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
            <Zap className="w-4 h-4 text-white" />
            <span className="text-xs font-medium text-white">
              Instant Support
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          className="space-y-4 flex flex-col items-center animate-fadeInUp"
          style={{ animationDelay: "0.4s" }}
        >
          {/* Get Started Button - Primary */}
          <NavLink
            to="/signup"
            className="group relative w-full max-w-[350px] py-4 overflow-hidden rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white to-blue-50 rounded-2xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#72BEEE] to-[#5AA5D8] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            <div className="relative flex items-center justify-center gap-2 font-bold text-lg">
              <span className="text-[#72BEEE] group-hover:text-white transition-colors duration-300">
                Get Started
              </span>
              <ArrowRight className="w-5 h-5 text-[#72BEEE] group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"></div>
          </NavLink>

          {/* Log In Button - Secondary */}
          <NavLink
            to="/login"
            className="group relative w-full max-w-[350px] py-4 overflow-hidden rounded-2xl border-2 border-white/40 backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/10"
          >
            <div className="relative flex items-center justify-center gap-2 font-semibold text-lg">
              <span className="text-white">Log In</span>
              <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </NavLink>

          {/* Additional Info */}
          <p className="text-white/70 text-sm mt-4">
            Free forever • No credit card required
          </p>
        </div>

        {/* Trust Indicators */}
        <div
          className="flex flex-wrap justify-center items-center gap-6 pt-6 animate-fadeInUp"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-white">10K+</p>
            <p className="text-xs text-white/70">Active Users</p>
          </div>
          <div className="w-px h-8 bg-white/30"></div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">24/7</p>
            <p className="text-xs text-white/70">AI Support</p>
          </div>
          <div className="w-px h-8 bg-white/30"></div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">100%</p>
            <p className="text-xs text-white/70">Secure</p>
          </div>
        </div>
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

        @keyframes floatDelayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: floatDelayed 3.5s ease-in-out infinite;
          animation-delay: 0.5s;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
