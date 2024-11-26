import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/Frame 2.svg";
import { API_BASE_URL } from "../base_url";

const VerifyEmail: React.FC = () => {
  const { email } = useParams<{ email: string }>();
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));
  const [loading, setLoading] = useState<boolean>(false);
  const [resendLoading, setResendLoading] = useState<boolean>(false);

  const handleOtpChange = (value: string, index: number) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(-1);
    setOtp(updatedOtp);

    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) (nextInput as HTMLInputElement).focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.every((digit) => digit !== "")) {
      const otpCode = otp.join("");

      try {
        setLoading(true);
        const response = await axios.post(API_BASE_URL + "/verify-email", {
          email,
          otp: otpCode,
        });

        if (response.status === 200) {
          const { user_credentials } = response.data;
          console.log(user_credentials);
          localStorage.setItem("healthUserToken", user_credentials.token);
          localStorage.setItem("healthUserId", user_credentials.userId);

          window.location.href = "/app/health-tips";
        }
      } catch (error) {
        console.error("Verification failed", error);
        alert("Invalid OTP. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please complete the OTP.");
    }
  };

  const handleResendCode = async () => {
    try {
      setResendLoading(true);
      const response = await axios.post(API_BASE_URL + "/request-otp", { email });

      if (response.status === 200) {
        alert("A new OTP has been sent to your email.");
      }
    } catch (error) {
      console.error("Resend code failed", error);
      alert("Failed to resend the code. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="flex relative items-center justify-center min-h-screen bg-[#C0D6E4] px-4 md:px-0">
      <div className="p-6 md:p-12 text-center w-full max-w-md md:max-w-lg">
        <a href="/signup">
          <img
            src={Logo}
            alt="Health Bot Logo"
            className="w-[205px] h-[36px] hidden md:block absolute left-3 top-3"
          />
        </a>

        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">Verify it’s you</h2>
          <p className="text-sm text-white">
            We sent a verification code to your email: <strong>{email}</strong>. Enter the code
            below to continue.
          </p>

          <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
            <div className="text-left">
              <label htmlFor="otp" className="block text-sm font-medium text-white mb-2">
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
              <button
                type="button"
                className="text-sm text-white hover:underline disabled:opacity-50"
                onClick={handleResendCode}
                disabled={resendLoading}
              >
                {resendLoading ? "Resending..." : "Resend code"}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2 text-white bg-[#72BEEE] rounded-md hover:bg-blue-500 transition duration-300"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Continue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
