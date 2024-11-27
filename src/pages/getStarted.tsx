import Robot from "../assets/Graident_Ai_Robot_1-removebg-preview 1.svg";
import Logo from "../assets/Frame 1.svg";
import { Navigate, NavLink } from "react-router-dom";

export default function GetStarted() {
  const token = localStorage.getItem("healthUserToken");
  if (token) {
    return <Navigate to="/app/health-tips" replace />;
  }
  return (
    <div className="flex items-center justify-center h-screen bg-[#C0D6E4] px-4 md:px-0">
      <div className="text-center space-y-12 md:max-w-[600px] w-full">
        <div className="space-y-6">
          <img src={Logo} alt="Health Bot Logo" className="mx-auto w-[149px] md:w-40" />
          <img src={Robot} alt="Robot Illustration" className="mx-auto w-28 md:w-36" />
        </div>
        <div className="space-y-4 flex flex-col items-center">
          <NavLink
            to="/signup"
            className="border border-white py-3 px-20 w-full max-w-[300px] bg-white text-center rounded-md font-medium text-base hover:bg-transparent text-blue-500 transition duration-300"
          >
            Get started
          </NavLink>
          <NavLink
            to="/login"
            className="border border-white py-3 px-20 w-full max-w-[300px] bg-transparent text-white text-center rounded-md font-medium text-base hover:bg-white hover:text-blue-500 transition duration-300"
          >
            Log in
          </NavLink>
        </div>
      </div>
    </div>
  );
}
