import { useState } from "react";
import { useNavigate } from "react-router-dom";
import personImage from "../assets/Ellipse 2 (1).svg";
import chatIcon from "../assets/tdesign_chat-bubble-history-filled.svg";
import sampleImage from "../assets/Scene of construction site with equipment.svg";
import time from "../assets/Frame 1000002388.png";



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
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);


const news: NewsItem[] = [
  {
    id: 1,
    tag: "Global Health",
    time: "2 hours ago",
    title:
      "Unicef initiates health infrastructure projects across West Africa to improve access to healthcare.",
    image: sampleImage, // Replace with a unique image URL for realism
  },
  {
    id: 2,
    tag: "Nutrition",
    time: "5 hours ago",
    title:
      "WHO launches campaign targeting malnutrition in Asia, Africa, and the Caribbean with innovative solutions.",
    image: sampleImage,
  },
  {
    id: 3,
    tag: "Policy",
    time: "1 day ago",
    title: "New U.S. regulations set to change the landscape for rabies prevention and treatment.",
    image: sampleImage, 
  },
  {
    id: 4,
    tag: "Research",
    time: "3 days ago",
    title:
      "Breakthrough study reveals the potential of mRNA vaccines for combating emerging diseases.",
    image: sampleImage, // Add a different image or illustration
  },
  {
    id: 5,
    tag: "Pandemic",
    time: "1 week ago",
    title: "Global COVID-19 response: Lessons learned and future pandemic preparedness.",
    image: sampleImage, // Use an image representing a health-related theme
  },
];




  const toggleDropdown = (id: number) => {
    setDropdownVisible(dropdownVisible === id ? null : id);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown((prev) => !prev);
  };

  const handlePreviousChats = () => {
    navigate("/app/mobileSavedChat");
    setShowProfileDropdown(false);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("healthUserToken");
      localStorage.removeItem("healthUserId");
      navigate("/login");
      setShowProfileDropdown(false);
    }
  };

  const handleExploreClick = () => {
    navigate("/app/health-tips");
  };

  const handleHealthNewsClick = () => {
    navigate("/app/health-news");
  };

  return (
    <div className="min-h-screen bg-[#C0D6E4] p-6">
      {/* Desktop only */}
      <div className="hidden md:flex justify-end">
        <img
          src={personImage}
          alt="User Avatar"
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={toggleProfileDropdown}
        />
        <p className="ml-3 text-sm text-white font-semibold hidden md:block">
          johndoe@gmail.com
        </p>
        {showProfileDropdown && (
          <div className="absolute right-12 top-14 mt-2 w-40 bg-white shadow-lg rounded-md text-gray-700">
            <button
              onClick={handleLogout}
              className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
            >
              Log out
            </button>
          </div>
        )}
      </div>

      {/* Mobile Only Button */}
      <div className="flex justify-between items-center mb-6 md:hidden">
        <div className="flex items-center relative">
          {/* User Avatar and Profile Dropdown */}
          <img
            src={personImage}
            alt="User Avatar"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={toggleProfileDropdown}
          />
          {showProfileDropdown && (
            <div className="absolute left-0 top-12 mt-2 w-40 bg-white shadow-lg rounded-md text-gray-700">
              <button
                onClick={handleLogout}
                className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
              >
                Log out
              </button>
            </div>
          )}
        </div>

        <button
          onClick={handlePreviousChats}
          className="bg-[#72BEEE] flex gap-1 text-white text-sm px-4 py-2 rounded-lg md:hidden"
        >
          <img src={chatIcon} alt="Chat Icon" className="w-5 h-5" />
          View saved chat
        </button>
      </div>

      {/* Health News Section */}
      <div className="grid place-content-center">
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
            <div
              key={item.id}
              className="bg-[#72BEEE] max-w-[646px] rounded-2xl p-4"
            >
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
              <p className="text-white text-base font-medium mb-2">
                {item.title}
              </p>
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
