import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Robot from "../assets/Graident_Ai_Robot_1-removebg-preview 1.svg";
import Logo from "../assets/Frame 2.svg";

const Signup: React.FC = () => {
  const navigate = useNavigate();

  // Handle form submission
  const handleContinue = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    navigate("/verify-otp");
  };

  return (
    <div className="flex relative items-center justify-center min-h-screen bg-blue-100 px-4 md:px-0">
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

        {/* Signup Form */}
        <div className="mt-8">
          <h2 className="text-2xl text-left md:text-3xl font-semibold text-white">
            <span className="text-[#72BEEE]">Create </span>your account
          </h2>
          <form className="mt-6 space-y-4" onSubmit={handleContinue}>
            <div>
              <label
                htmlFor="email"
                className="block text-left text-sm font-medium text-white"
              >
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
              <label
                htmlFor="password"
                className="block text-left text-sm font-medium text-white"
              >
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
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-left text-sm font-medium text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border border-white rounded-md focus:ring-2 focus:ring-[#72BEEE] focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-[#72BEEE] rounded-md hover:bg-blue-500 transition duration-300"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
