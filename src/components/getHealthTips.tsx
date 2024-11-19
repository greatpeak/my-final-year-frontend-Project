import { useNavigate } from "react-router-dom";
import personImage from "../assets/Ellipse 2 (1).svg";
import chat from "../assets/tdesign_chat-bubble-history-filled.svg";
import message from "../assets/tabler_message-filled.svg";

export default function GetHealthTips() {
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
    { name: "Aids", description: "Difference between AIDS and HIV." },
    {
      name: "Malaria",
      description: "Fast treatment, prevention, and control.",
    },
    {
      name: "Tuberculosis",
      description: "Symptoms, prevention, and treatment of tuberculosis.",
    },
    {
      name: "Heart Disease",
      description: "Learn about heart disease, risk factors, and prevention.",
    },
    {
      name: "Asthma",
      description: "Symptoms, triggers, and management of asthma.",
    },
    {
      name: "Obesity",
      description: "Understanding obesity and how to manage it effectively.",
    },
    {
      name: "Stroke",
      description: "Early signs, risk factors, and treatments for stroke.",
    },
    {
      name: "Arthritis",
      description: "Types, causes, and treatments for arthritis.",
    },
    {
      name: "Depression",
      description: "Recognizing depression and how to seek help.",
    },
    {
      name: "Hepatitis",
      description: "Learn about different types of hepatitis and prevention.",
    },
  ];

  const handleExploreClick = () => {
    navigate("/loginIn/explore");
  };

  const handleHealthNewsClick = () => {
    navigate("/loginIn/health-news");
  };

  const handleViewSavedChatClick = () => {
    navigate("/loginIn/health-bot");
  };

  return (
    <div className="h-auto bg-blue-100 p-6 flex flex-col">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center ">
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
          onClick={handleViewSavedChatClick}
        >
          <img src={chat} alt="Chat Icon" />
          View saved chat
        </button>
      </div>

      {/* Greeting Section */}
      <div className="flex justify-center items-center flex-col flex-grow mt-7">
        <p className="text-lg font-normal text-white text-center">
          Hello, User 👋
        </p>
        <p className="text-2xl font-semibold text-white text-center">
          Get health tips
        </p>
        <button className="mt-2 mb-5 text-white flex gap-2 items-center justify-center">
          <img src={message} alt="message icon" className="w-6 h-6" />
          Tap to chat
        </button>
      </div>

      {/* Explore & Health News Section */}
      <div>
        <div className="flex gap-2 mt-4">
          <p
            className="text-white md:text-lg font-bold mb-4 underline border-r-2 pr-3 border-white cursor-pointer"
            onClick={handleExploreClick}
          >
            Explore
          </p>
          <p
            className="text-white md:text-lg font-bold mb-4 cursor-pointer"
            onClick={handleHealthNewsClick}
          >
            Health news
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {topics.map((topic, index) => (
            <div
              key={index}
              className="bg-[#72BEEE] text-white p-4 rounded-lg shadow-lg"
            >
              <p className="text-lg font-semibold">{topic.name}</p>
              <p className="text-sm">{topic.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
