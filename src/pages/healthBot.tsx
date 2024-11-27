import { useNavigate } from "react-router-dom";
import { useState } from "react";
import personImage from "../assets/Ellipse 2 (1).svg";
import send from "../assets/Send.svg";
import robotImage from "../assets/Graident_Ai_Robot_1-removebg-preview 1.svg";
import arrow from "../assets/Arrow-Left.svg";
import menu from "../assets/Menu-Alt-2.svg";

export default function HealthBot() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

const handleLogout = () => {
  const confirmLogout = window.confirm("Are you sure you want to log out?");
  if (confirmLogout) {
    localStorage.removeItem("healthUserToken");
    localStorage.removeItem("healthUserId");
    navigate("/login");
    setShowDropdown(false);
  }
};

  return (
    <div className="min-h-screen flex flex-col bg-[#C0D6E4]">
      {/* Desktop only */}
      <div className="hidden md:flex justify-end mt-3 mr-2">
        <img
          src={personImage}
          alt="User Avatar"
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={toggleDropdown}
        />
        <p className="ml-3 text-sm text-white font-semibold hidden md:block">
          johndoe@gmail.com
        </p>
        {showDropdown && (
          <div className="absolute right-6 top-8 mt-2 w-40 bg-white shadow-lg rounded-md text-gray-700">
            <button
              onClick={handleLogout}
              className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
            >
              Log out
            </button>
          </div>
        )}
      </div>

      {/* Mobile Header */}
      <div className="w-full bg-white md:hidden justify-between h-[56px] items-center px-2 flex">
        <button onClick={handleGoBack}>
          <img src={arrow} alt="Back Arrow" />
        </button>
        <h3 className="font-medium">Health Bot</h3>
        <button onClick={toggleDropdown}>
          <img src={menu} alt="Menu" />
        </button>
      </div>

      {/* Chat Section */}
      <div className="flex-grow p-4 space-y-4">
        <div className="flex items-start space-x-3">
          <img src={robotImage} alt="" className="h-[24px] w-[20px]" />
          <div className="bg-white p-3 rounded-lg shadow-md">
            <p>What question should I help you with?</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 justify-end">
          <div className="bg-[#72BEEE] text-white p-3 rounded-lg shadow-md">
            <p>
              I would like to know the places that are most likely to get
              cholera
            </p>
          </div>
          <img src={personImage} alt="" className="h-auto w-auto" />
        </div>
      </div>

      {/* Input Section */}
      <div className="fixed bottom-6 right-0 w-full max-w-[761px] flex items-center p-3 md:bottom-6 md:right-14">
        <input
          type="text"
          placeholder="Type message"
          className="flex-grow relative p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm md:text-base"
        />
        <button className="absolute right-6 md:right-4">
          <img src={send} alt="Send" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
