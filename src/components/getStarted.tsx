import Robot from "../assets/Graident_Ai_Robot_1-removebg-preview 1.svg";
import Logo from "../assets/Frame 1.svg";
import { NavLink } from "react-router-dom";

export default function GetStarted() {
  return (
    <div className="flex items-center justify-center h-screen bg-blue-100 px-4 md:px-0">
      <div className="text-center space-y-12">
        {/* Logo and Robot */}
        <div className="space-y-4">
          <img
            src={Logo}
            alt="Health Bot Logo"
            className="mx-auto w-32 md:w-40"
          />
          <img src={Robot} alt="Robot" className="mx-auto w-28 md:w-36" />
        </div>

        {/* Buttons */}
        <div className="space-y-4 flex flex-col items-center">
          <button className="bg-[#72BEEE] py-3 px-32 text-white rounded-md font-medium text-base hover:bg-blue-500 transition duration-300">
            <NavLink to="/signup">Get Started</NavLink>
          </button>
          <button className="border border-white bg-transparent py-3 px-32 font-medium text-base text-white rounded-md hover:bg-white hover:text-blue-500 transition duration-300">
            <NavLink to="/login">Log in</NavLink>
          </button>
        </div>
      </div>
    </div>
  );
}
