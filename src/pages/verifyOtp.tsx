import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Frame 2.svg";

const VerifyOtp: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(Array(5).fill(""));

  // Handle OTP input changes
  const handleOtpChange = (value: string, index: number) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(-1); // Ensure only the last character is kept
    setOtp(updatedOtp);

    // Auto-focus the next input field
    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) (nextInput as HTMLInputElement).focus();
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if all OTP fields are filled
    if (otp.every((digit) => digit !== "")) {
      navigate("/loginIn/health-tips");
    } else {
      alert("Please complete the OTP.");
    }
  };

  return (
    <div className="flex relative items-center justify-center min-h-screen bg-[#C0D6E4] px-4 md:px-0">
      <div className="p-6 md:p-12 text-center w-full max-w-md md:max-w-lg">
        {/* OTP Verification */}
        <a href="/signup">
          <img
            src={Logo}
            alt="Health Bot Logo"
            className="w-[205px] h-[36px] hidden md:block absolute left-3 top-3"
          />
        </a>

        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Verify it’s you
          </h2>
          <p className="text-sm text-white">
            We sent a verification code to your email. Enter the code below to
            continue.
          </p>

          <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
            <div className="text-left">
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-white mb-2"
              >
                Input code
              </label>
              <div className="flex justify-center gap-2 md:gap-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    className="w-10 h-10 md:w-14 md:h-14 text-center text-lg border border-white rounded-md focus:ring-2 focus:ring-[#72BEEE] focus:outline-none"
                  />
                ))}
              </div>
            </div>
            <div className="text-right">
              <a href="#" className="text-sm text-white hover:underline">
                Resend code
              </a>
            </div>

            {/* Continue Button */}
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

export default VerifyOtp;
