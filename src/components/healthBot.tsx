import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import personImage from "../assets/Ellipse 2 (1).svg";
import send from "../assets/Send.svg";
import robotImage from "../assets/Graident_Ai_Robot_1-removebg-preview 1.svg";
import arrow from "../assets/Arrow-Left.svg";
import menu from "../assets/Menu-Alt-2.svg";

export default function HealthBot() {
  const navigate = useNavigate(); // Initialize navigate function

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-100">
      {/* Header Section Big Screen */}
      <div className="p-4 align-right hidden md:block">
        <div className="flex items-center">
          <img
            src={personImage}
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <p className="ml-3 text-sm text-white font-semibold hidden md:block">
            johndoe@gmail.com
          </p>
        </div>
      </div>

      {/* Header Section Mobile Screen */}
      <div className="w-full bg-white md:hidden justify-between h-[56px] items-center px-2 flex">
        <button onClick={handleGoBack}>
          <img src={arrow} alt="Back Arrow" />
        </button>
        <h3 className="font-medium">Health Bot</h3>
        <button>
          <img src={menu} alt="Menu" />
        </button>
      </div>

      {/* Chat Messages Section */}
      <div className="flex-grow p-4 space-y-4">
        {/* Bot Message */}
        <div className="flex items-start space-x-3">
          <img src={robotImage} alt="" className="h-[24px] w-[20px]" />
          <div className="bg-white p-3 rounded-lg shadow-md">
            <p>What question should I help you with?</p>
          </div>
        </div>

        {/* User Message */}
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
