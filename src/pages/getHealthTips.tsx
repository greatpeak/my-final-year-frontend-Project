/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Logo from "../assets/Ellipse 2 (1).svg";
import chat from "../assets/tdesign_chat-bubble-history-filled.svg";
import { API_BASE_URL } from "../base_url";
import { useChatStore } from "../zustand";
import { topics } from "../data";
import HealthDataModal from "./health_data_modal";
import HealthStatusViewer from "./health_status_viewer";
import { User, FileText, LogOut, ChevronDown } from "lucide-react";

export default function GetHealthTips() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const add = useChatStore((state: any) => state.add);
  const [showViewer, setShowViewer] = useState(false);
  const dropdownRefMobile = useRef<HTMLDivElement>(null);
  const dropdownRefDesktop = useRef<HTMLDivElement>(null);
  const [userName, setUserName] = useState<string>("Dear");

  useEffect(() => {
    const firstName = localStorage.getItem("healthUserFirstName");
    const lastName = localStorage.getItem("healthUserLastName");

    if (firstName && lastName) {
      setUserName(`${firstName} ${lastName}`);
    } else if (firstName) {
      setUserName(firstName);
    }
  }, []);

  const handleViewHealthStatus = () => {
    setShowViewer(true);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isOutsideMobile =
        dropdownRefMobile.current &&
        !dropdownRefMobile.current.contains(target);
      const isOutsideDesktop =
        dropdownRefDesktop.current &&
        !dropdownRefDesktop.current.contains(target);

      if (isOutsideMobile && isOutsideDesktop) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const sendMessageToChatScreen = async () => {
    if (message.trim() === "") {
      return;
    }
    setLoading(true);
    const token = localStorage.getItem("healthUserToken");
    const userId = localStorage.getItem("healthUserId");
    const firstName = localStorage.getItem("healthUserFirstName");
    const lastName = localStorage.getItem("healthUserLastName");

    if (!token || !userId) {
      console.error("Missing token or user ID. Redirect to login.");
      return;
    }
    try {
      const userHealthData = localStorage.getItem("userHealthData");
      if (!userHealthData || userHealthData.trim() === "{}") {
        setLoading(false);
        setIsModalOpen(true);
        return;
      }

      const healthInfo = userHealthData ? JSON.parse(userHealthData) : {};

      healthInfo.firstName = firstName || "there";
      healthInfo.lastName = lastName || "";
      healthInfo.fullName = `${firstName || ""} ${lastName || ""}`.trim();

      console.log("📤 Sending healthInfo with name:", healthInfo);

      const response = await fetch(`${API_BASE_URL}/prompt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          authId: userId,
          queryText: message,
          healthInfo: healthInfo,
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
    const firstName = localStorage.getItem("healthUserFirstName");
    const lastName = localStorage.getItem("healthUserLastName");

    if (!token || !userId) {
      console.error("Missing token or user ID. Redirect to login.");
      return;
    }
    try {
      const userHealthData = localStorage.getItem("userHealthData");
      if (!userHealthData || userHealthData.trim() === "{}") {
        setLoading(false);
        setIsModalOpen(true);
        return;
      }

      const healthInfo = userHealthData ? JSON.parse(userHealthData) : {};

      healthInfo.firstName = firstName || "there";
      healthInfo.lastName = lastName || "";
      healthInfo.fullName = `${firstName || ""} ${lastName || ""}`.trim();

      console.log("📤 Sending explore healthInfo with name:", healthInfo);

      const response = await fetch(`${API_BASE_URL}/prompt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          authId: userId,
          queryText: `Provide personalized health tips about: ${message}`,
          healthInfo: healthInfo,
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
      localStorage.removeItem("userHealthData");
      localStorage.removeItem("healthUserFirstName");
      localStorage.removeItem("healthUserLastName");
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

  return (
    <div className="h-auto bg-[#C0D6E4] p-6 flex flex-col">
      {/* Desktop only */}
      <div className="hidden md:flex justify-end" ref={dropdownRefDesktop}>
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-2 bg-white hover:bg-gray-50 transition-all duration-200 px-4 py-2 rounded-full shadow-md hover:shadow-lg"
        >
          <img src={Logo} alt="User Avatar" className="w-8 h-8 rounded-full" />
          <span className="text-sm font-medium text-gray-700">Profile</span>
          <ChevronDown
            className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
              showDropdown ? "rotate-180" : ""
            }`}
          />
        </button>

        {showDropdown && (
          <div className="absolute right-6 top-20 w-56 bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100 z-50 animate-fadeIn">
            <div className="bg-gradient-to-r from-[#72BEEE] to-[#5AA5D8] p-4">
              <div className="flex items-center gap-3">
                <img
                  src={Logo}
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full border-2 border-white"
                />
                <div>
                  <p className="text-white font-semibold text-sm">{userName}</p>
                  <p className="text-white/80 text-xs">Health Dashboard</p>
                </div>
              </div>
            </div>

            <div className="py-2">
              <button
                onClick={handleViewHealthStatus}
                className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 w-full text-left transition-colors duration-150 group"
              >
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <User className="w-4 h-4 text-[#72BEEE]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    View Health Status
                  </p>
                  <p className="text-xs text-gray-500">
                    Check your health data
                  </p>
                </div>
              </button>

              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setShowDropdown(false);
                }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 w-full text-left transition-colors duration-150 group"
              >
                <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                  <FileText className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Update Health Status
                  </p>
                  <p className="text-xs text-gray-500">
                    Modify your information
                  </p>
                </div>
              </button>

              <div className="border-t border-gray-100 my-2"></div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 w-full text-left transition-colors duration-150 group"
              >
                <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                  <LogOut className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Log out</p>
                  <p className="text-xs text-gray-500">
                    Sign out of your account
                  </p>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Mobile Only Button */}
      <div className="flex justify-between items-center mb-6 md:hidden">
        <div className="flex items-center relative" ref={dropdownRefMobile}>
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 bg-white hover:bg-gray-50 transition-all duration-200 px-3 py-2 rounded-full shadow-md"
          >
            <img
              src={Logo}
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
            <ChevronDown
              className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                showDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {showDropdown && (
            <div className="absolute left-0 top-14 w-64 bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100 z-50 animate-fadeIn">
              <div className="bg-gradient-to-r from-[#72BEEE] to-[#5AA5D8] p-4">
                <div className="flex items-center gap-3">
                  <img
                    src={Logo}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full border-2 border-white"
                  />
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {userName}
                    </p>
                    <p className="text-white/80 text-xs">Health Dashboard</p>
                  </div>
                </div>
              </div>

              <div className="py-2">
                <button
                  onClick={handleViewHealthStatus}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 w-full text-left transition-colors duration-150 group"
                >
                  <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <User className="w-4 h-4 text-[#72BEEE]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      View Health Status
                    </p>
                    <p className="text-xs text-gray-500">
                      Check your health data
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    setShowDropdown(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 w-full text-left transition-colors duration-150 group"
                >
                  <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                    <FileText className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Update Health Status
                    </p>
                    <p className="text-xs text-gray-500">
                      Modify your information
                    </p>
                  </div>
                </button>

                <div className="border-t border-gray-100 my-2"></div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 w-full text-left transition-colors duration-150 group"
                >
                  <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                    <LogOut className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Log out</p>
                    <p className="text-xs text-gray-500">
                      Sign out of your account
                    </p>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handlePreviousChats}
          className="bg-[#72BEEE] flex gap-2 items-center text-white text-sm px-4 py-2 rounded-full shadow-md hover:shadow-lg hover:bg-[#5AA5D8] transition-all duration-200"
        >
          <img src={chat} alt="Chat Icon" className="w-5 h-5" />
          <span>Saved chats</span>
        </button>
      </div>
      {/* Greeting Section - Compact Design */}
      <div className="flex justify-center items-center flex-col my-4">
        <div className="relative w-full max-w-md mx-auto">
          {/* Subtle Background Glow */}
          <div className="absolute inset-0 bg-white/30 rounded-3xl blur-2xl"></div>

          {/* Compact Card */}
          <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-6 md:p-8 border border-white/50">
            {/* Small Avatar */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#72BEEE] to-[#5AA5D8] rounded-full blur-md opacity-30"></div>
                <img
                  src={Logo}
                  alt="User Avatar"
                  className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border-3 border-white shadow-lg"
                />
              </div>
            </div>
            {/* Greeting Text - Compact */}
            <div className="text-center space-y-2 mb-5">
              <p className="text-sm text-gray-500">Welcome back 👋</p>
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#72BEEE] to-[#5AA5D8] bg-clip-text text-transparent">
                Hello, {userName}!
              </h2>
              <p className="text-sm text-gray-600">
                Ready for your health tips?
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Explore & Health News Section */}
      <div className="pb-40">
        {/* Tab Navigation */}
        <div className=" mt-4 mb-8">
          <div className="flex gap-1 bg-white/10 backdrop-blur-sm p-1.5 rounded-2xl inline-flex">
            <button
              className="px-6 py-2.5 rounded-xl font-bold text-white bg-white/20 border-2 border-white/40 shadow-lg transition-all duration-200"
              onClick={handleExploreClick}
            >
              🔍 Explore
            </button>
            <button
              className="px-6 py-2.5 rounded-xl font-bold text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
              onClick={handleHealthNewsClick}
            >
              📰 Health News
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {topics.map((topic, index) => {
            const IconComponent = topic.icon;
            return (
              <div
                key={index}
                className={`bg-gradient-to-br ${topic.gradient} text-white p-5 rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 group relative overflow-hidden`}
                onClick={() => sendExploreMessageToChatScreen(topic.name)}
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>

                {/* Icon with background */}
                <div className="relative mb-3">
                  <div className="inline-flex p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                    {IconComponent ? (
                      <IconComponent className="h-6 w-6 text-white" />
                    ) : (
                      <img src={topic.img} alt="" className="h-6 w-6" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <p className="text-lg font-bold mb-1.5 group-hover:translate-x-1 transition-transform duration-200">
                    {topic.name}
                  </p>
                  <p className="text-sm text-white/90 leading-relaxed">
                    {topic.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Enhanced Input Section */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:ml-24 w-full max-w-[761px] px-3 md:px-6 z-20">
        <div className="relative">
          {/* Gradient border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#72BEEE] via-[#5AA5D8] to-[#72BEEE] rounded-3xl blur-sm opacity-60"></div>

          {/* Input container */}
          <div className="relative bg-white rounded-3xl shadow-2xl border-2 border-white/50 backdrop-blur-sm overflow-hidden">
            {/* Message counter and character limit */}
            {message.length > 0 && (
              <div className="absolute -top-7 right-2 text-xs text-white/80 bg-[#72BEEE]/80 px-3 py-1 rounded-full backdrop-blur-sm">
                {message.length} characters
              </div>
            )}

            <div className="flex items-center gap-2 p-2">
              {/* Input field */}
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !loading && message.trim()) {
                    e.preventDefault();
                    sendMessageToChatScreen();
                  }
                }}
                placeholder="Ask your personalized health AI anything..."
                className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-sm md:text-base text-gray-800 placeholder-gray-400"
              />

              {/* Send button */}
              <button
                onClick={sendMessageToChatScreen}
                disabled={loading || !message.trim()}
                className={`p-3 rounded-2xl transition-all duration-300 flex items-center justify-center ${
                  loading || !message.trim()
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#72BEEE] to-[#5AA5D8] hover:from-[#5AA5D8] hover:to-[#4A9AC8] shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                }`}
              >
                {loading ? (
                  <div className="flex gap-1">
                    <div
                      className="w-2 h-2 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                ) : (
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Bottom hint text */}
            {!message && (
              <div className="px-4 pb-2 flex items-center gap-2 text-xs text-gray-400">
                <span className="inline-flex items-center gap-1">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Press Enter to send
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && <HealthDataModal onClose={handleCloseModal} />}
      {showViewer && (
        <HealthStatusViewer onClose={() => setShowViewer(false)} />
      )}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
