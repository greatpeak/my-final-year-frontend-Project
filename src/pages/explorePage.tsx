import { useNavigate } from "react-router-dom";
import personImage from "../assets/Ellipse 2 (1).svg";
import chatIcon from "../assets/tdesign_chat-bubble-history-filled.svg";
import send from "../assets/Send.svg";

export default function ExplorePage() {
  const navigate = useNavigate();

  const topics = [
    {
      name: "Cancer",
      description: "Know more about cancer, symptoms and effects.",
    },
    {
      name: "Diabetes",
      description: "Know the stages of diabetes, causes and effects.",
    },
    { name: "AIDS", description: "Difference between AIDS and HIV." },
    {
      name: "Malaria",
      description: "Fast treatment, prevention, and control.",
    },
    // Add more topics as needed
  ];

  const handleExploreClick = () => {
    navigate("/loginIn/explore");
  };

  const handleHealthNewsClick = () => {
    navigate("/loginIn/health-news");
  };

  return (
    <div className="min-h-screen bg-[#C0D6E4] p-6 flex flex-col">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
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
        <button
          className="bg-[#72BEEE] flex gap-1 text-white text-sm px-4 py-2 rounded-lg md:hidden"
          aria-label="View saved chat"
          onClick={() => navigate("/loginIn/mobileSavedChat")}
        >
          <img src={chatIcon} alt="Chat Icon" className="w-5 h-5" />
          View saved chat
        </button>
      </div>

      {/* Explore Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <p
            className="text-white text-lg font-bold underline pr-3 border-r-2 border-white cursor-pointer"
            onClick={handleExploreClick}
          >
            Explore
          </p>
          <p
            className="text-white text-lg font-bold cursor-pointer"
            onClick={handleHealthNewsClick}
          >
            Health news
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {topics.map((topic, index) => (
            <div
              key={index}
              className="bg-[#72BEEE] text-white p-4 rounded-lg shadow-md hover:shadow-lg"
            >
              <p className="text-lg font-semibold">{topic.name}</p>
              <p className="text-sm">{topic.description}</p>
            </div>
          ))}
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
