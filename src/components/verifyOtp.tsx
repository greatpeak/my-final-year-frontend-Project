import Logo from "../assets/Frame 2.svg";
import { Link } from "react-router-dom";

export default function VerifyOtp() {
  return (
    <div className="flex relative items-center justify-center min-h-screen bg-blue-100 px-4 md:px-0">
      <div className="p-6 md:p-12 text-center w-full max-w-md md:max-w-lg">
        {/* OTP Verification */}
        <Link to="/signup">
          <img
            src={Logo}
            alt="Health Bot Logo"
            className="w-[205px] h-[36px] hidden md:block absolute left-3 top-3"
          />
        </Link>

        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Verify it’s you
          </h2>
          <p className="text-sm text-white ">
            We sent a verification code to your email. Enter the code below to
            continue.
          </p>

          <form className="mt-6 space-y-6">
            <div className="text-left">
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-white mb-2"
              >
                Input code
              </label>
              <div className="flex justify-center gap-2 md:gap-9">
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
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
          </form>

          {/* Continue Button for larger screens */}
          <button className="w-full py-2 text-white bg-[#72BEEE] rounded-md hover:bg-blue-500 transition duration-300">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
