/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import personImage from "../assets/Ellipse 2 (1).svg";
import chat from "../assets/tdesign_chat-bubble-history-filled.svg";
import circle from "../assets/Ellipse 2.svg";
import send from "../assets/Send.svg";
import messageIcon from "../assets/tabler_message-filled.svg";
import circle2 from "../assets/Ellipse 11.svg";
import { API_BASE_URL } from "../base_url";
import { useChatStore } from "../zustand";
import { topics } from "../data";
import HealthDataModal from "./health_data_modal";
import HealthStatusViewer from "./health_status_viewer";

export default function GetHealthTips() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const add = useChatStore((state: any) => state.add);

  const [showViewer, setShowViewer] = useState(false);

  const handleViewHealthStatus = () => setShowViewer(true);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

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
      const userHealthData = localStorage.getItem("userHealthData");
      // Show modal if health data is missing
      if (!userHealthData || userHealthData.trim() === "{}") {
        setLoading(false);
        setIsModalOpen(true);
        return;
      }

      const healthInfo = userHealthData ? JSON.parse(userHealthData) : {};
      const response = await fetch(`${API_BASE_URL}/prompt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          authId: userId,
          queryText: `User Health Information: ${JSON.stringify(
            healthInfo
          )}\nUsing the above user health information, respond to the following query: ${message}`,
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

  const sendExploreMessageToChatScreen = async (title: string) => {
    const message = `${title}`;
    setLoading(true);
    const token = localStorage.getItem("healthUserToken");
    const userId = localStorage.getItem("healthUserId");
    if (!token || !userId) {
      console.error("Missing token or user ID. Redirect to login.");
      return;
    }
    try {
      const userHealthData = localStorage.getItem("userHealthData");
      // Show modal if health data is missing
      if (!userHealthData || userHealthData.trim() === "{}") {
        setLoading(false);
        setIsModalOpen(true);
        return;
      }

      const healthInfo = userHealthData ? JSON.parse(userHealthData) : {};
      const response = await fetch(`${API_BASE_URL}/prompt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          authId: userId,
          queryText: `User Health Information: ${JSON.stringify(
            healthInfo
          )}\nUsing the above user health information, respond to the following query. Don't return the information. Just let them know it base on their personal information: ${message}`,
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
  const handlePreviousChats = () => {
    navigate("/app/mobileSavedChat");
    setShowDropdown(false);
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

  useEffect(() => {
    const storedData = localStorage.getItem("userHealthData");
    if (!storedData) {
      setIsModalOpen(true);
    }
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleExploreClick = () => {
    navigate("/app/health-tips");
  };

  const handleHealthNewsClick = () => {
    navigate("/app/health-news");
  };

  const handleChatClick = () => {
    navigate("/app/health-bot");
  };

  return (
    <div className="h-auto bg-[#C0D6E4] p-6 flex flex-col">
      {/* Desktop only */}
      <div className="hidden md:flex justify-end">
        <img
          src={personImage}
          alt="User Avatar"
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={toggleDropdown}
        />
        <p className="ml-3 text-sm text-white font-semibold hidden md:block">johndoe@gmail.com</p>
        {showDropdown && (
          <div className="absolute right-12 top-14 mt-2 w-40 bg-white shadow-lg rounded-md text-gray-700">
            <button
              onClick={handleLogout}
              className="block px-4 py-2 hover:bg-gray-100 w-full text-left text-xs"
            >
              Log out
            </button>
            <button
              onClick={handleViewHealthStatus}
              className="block px-4 py-2 hover:bg-gray-100 w-full text-left text-xs"
            >
              View Health Status
            </button>

            <button
              onClick={handleViewHealthStatus}
              className="block px-4 py-2 hover:bg-gray-100 w-full text-left text-xs"
            >
              Update Health Status
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
            onClick={toggleDropdown}
          />
          {showDropdown && (
            <div className="absolute left-0 top-12 mt-2 w-40 bg-white shadow-lg rounded-md text-gray-700">
              {/* View Health Status */}
              <button
                onClick={handleViewHealthStatus}
                className="block px-4 py-2 hover:bg-gray-100 w-full text-left text-xs"
              >
                View Health Status
              </button>

              {/* Change Health Status */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="block px-4 py-2 hover:bg-gray-100 w-full text-left text-xs"
              >
                Update Health Status
              </button>

              {/* Log Out */}
              <button
                onClick={handleLogout}
                className="block px-4 py-2 hover:bg-gray-100 w-full text-left text-xs"
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
          <img src={chat} alt="Chat Icon" className="w-5 h-5" />
          View saved chat
        </button>
      </div>

      {/* Greeting Section */}
      <div className="flex justify-center items-center flex-col flex-grow mt-7">
        <img src={circle} alt="" className="relative h-[256px] w-[256px]" />
        <div className="absolute">
          <img
            src={circle2}
            alt=""
            className="absolute right-[-30px] md:right-[-50px] top-[-90px] md:top-[-100px] w-[96px] h-[96px]"
          />
          <p className="text-lg font-normal text-white text-center">Hello, User 👋</p>
          <p className="text-2xl mt-5 font-semibold text-white text-center">Get health tips</p>
          <button
            onClick={handleChatClick}
            className="mt-5 mb-5 text-white text-center flex gap-2 items-center justify-center"
          >
            <img src={messageIcon} alt="message icon" className="w-6 h-6" />
            Tap to chat
          </button>
        </div>
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
              onClick={() => sendExploreMessageToChatScreen(topic.name)}
            >
              <img src={topic.img} alt="" className="h-[24px] w-[24px]" />
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
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask your personalized AI anything"
          className="flex-grow relative p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm md:text-base"
        />
        <button
          className="absolute right-6 md:right-4 text-blue-600"
          onClick={sendMessageToChatScreen}
        >
          {loading ? "...." : <img src={send} alt="Send" className="w-6 h-6" />}
        </button>
      </div>
      {isModalOpen && <HealthDataModal onClose={handleCloseModal} />}
      {showViewer && <HealthStatusViewer onClose={() => setShowViewer(false)} />}
    </div>
  );
}
