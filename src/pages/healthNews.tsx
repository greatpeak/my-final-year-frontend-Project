import { useState } from "react";
import { useNavigate } from "react-router-dom";
import personImage from "../assets/Ellipse 2 (1).svg";
import chatIcon from "../assets/tdesign_chat-bubble-history-filled.svg";
import sampleImage from "../assets/Scene of construction site with equipment.svg";
import time from "../assets/Frame 1000002388.png";

// Define TypeScript types for the news items
interface NewsItem {
  id: number;
  tag: string;
  time: string;
  title: string;
  image: string;
}

export default function HealthNews() {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);

  const news: NewsItem[] = [
    {
      id: 1,
      tag: "News",
      time: time,
      title:
        "Unicef to start building health centers in major west African countries",
      image: sampleImage,
    },
    {
      id: 2,
      tag: "Hot topics🔥",
      time: time,
      title:
        "WHO kickstarts campaign against malnutrition in Asia, Africa, and the Dominican Republic.",
      image: sampleImage,
    },
    {
      id: 3,
      tag: "Hot topics🔥",
      time: time,
      title:
        "Donald Trump fight against rabies in the United States takes a drastic step due to new regulations.",
      image: sampleImage,
    },
  ];

  // Function to toggle dropdown visibility
  const toggleDropdown = (id: number) => {
    setDropdownVisible(dropdownVisible === id ? null : id);
  };

  const handleExploreClick = () => {
    navigate("/loginIn/explore");
  };

  const handleHealthNewsClick = () => {
    navigate("/loginIn/health-news");
  };

  const handleViewChatClick = () => {
    // Navigate to the HealthBot page when the button is clicked
    navigate("/loginIn/health-bot");
  };

  return (
    <div className="min-h-screen bg-[#C0D6E4] p-6">
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
          onClick={handleViewChatClick} // Added onClick handler to navigate to HealthBot
          className="bg-[#72BEEE] flex gap-1 text-white text-sm px-4 py-2 rounded-lg md:hidden"
          aria-label="View saved chat"
        >
          <img src={chatIcon} alt="Chat Icon" className="w-5 h-5" />
          View saved chat
        </button>
      </div>

      {/* Health News Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <p
            className="text-white text-lg font-bold pr-3 border-r-2 cursor-pointer"
            onClick={handleExploreClick}
          >
            Explore
          </p>
          <p
            className="text-white text-lg font-bold underline cursor-pointer"
            onClick={handleHealthNewsClick}
          >
            Health news
          </p>
        </div>

        {/* News List */}
        <div className="space-y-4">
          {news.map((item) => (
            <div key={item.id} className="bg-[#72BEEE] rounded-2xl p-4">
              {/* Tag and Views */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="bg-[#F2F2F2] mb-3 text-black text-xs font-bold px-3 py-2 rounded-full">
                    {item.tag}
                  </span>
                  <img src={time} alt="" className="h-[16px] w-10" />
                </div>

                <button
                  onClick={() => toggleDropdown(item.id)}
                  className="relative text-white"
                  aria-label="More options"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v.01M12 12v.01M12 18v.01"
                    />
                  </svg>
                  {dropdownVisible === item.id && (
                    <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-24">
                      <button className="block px-4 py-2 text-sm hover:bg-gray-100">
                        Share
                      </button>
                      <div className="w-[80%] h-[1px] bg-black mx-2"></div>
                      <button className="block px-4 py-2 text-sm hover:bg-gray-100">
                        Remove
                      </button>
                    </div>
                  )}
                </button>
              </div>

              {/* Title*/}
              <p className="text-white text-base font-medium mb-2">
                {item.title}
              </p>

              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-cover rounded-lg my-4"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
