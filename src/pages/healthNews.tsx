import { useState } from "react";
import { useNavigate } from "react-router-dom";
import personImage from "../assets/Ellipse 2 (1).svg";
import send from "../assets/Send.svg";
import chatIcon from "../assets/tdesign_chat-bubble-history-filled.svg";
import sampleImage from "../assets/Scene of construction site with equipment.svg";
import time from "../assets/Frame 1000002388.png";
import { API_BASE_URL } from "../base_url";
import { useChatStore } from "../zustand";


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
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string>("");
    const add = useChatStore((state: any) => state.add);


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
      tag: "News",
      time: time,
      title:
        "WHO kickstarts campaign against malnutrition in Asia, Africa, and the Dominican Republic.",
      image: sampleImage,
    },
    {
      id: 3,
      tag: "News",
      time: time,
      title:
        "Donald Trump fight against rabies in the United States takes a drastic step due to new regulations.",
      image: sampleImage,
    },
  ];

    const sendMessageToChatScreen = async () => {
      if (message.trim() === "") {
        return;
      }
      setLoading(true);
      const token = localStorage.getItem("healthUserToken");
      const userId = localStorage.getItem("healthUserId");
      if (!token || !userId) {
        console.error("Missing token or user ID. Redirect to login.");
        return;
      }
      try {
        const response = await fetch(`${API_BASE_URL}/prompt`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            authId: userId,
            queryText: message,
            queryId: "no-queryId",
          }),
        });
        if (!response.ok) {
          console.error(`API Error: ${response.statusText}`);
          return;
        }
        const data = await response.json();
        setMessage("");
        setLoading(false);
        if (data?.type === "newChat") {
          add({
            queryText: data?.data?.query.queryText,
            response: data?.data?.query.response,
            id: data?.data?.query?.id,
            createdAt: data?.data?.query?.createdAt,
          });
          navigate("/app/health-bot/" + data?.data?.query?.id);
        }
      } catch (error) {
        console.error("Error sending message:", error);
        setLoading(false);
      }
    };

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
    navigate("/app/explore");
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
      {/* Input Section */}
      <div className="fixed bottom-6 right-0 w-full max-w-[761px] flex items-center p-3 md:bottom-6 md:right-14">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message"
          className="flex-grow relative p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm md:text-base"
        />
        <button
          className="absolute right-6 md:right-4 text-blue-600"
          onClick={sendMessageToChatScreen}
        >
          {loading ? (
            "...."
          ) : (
            <img src={send} alt="Send" className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
}
