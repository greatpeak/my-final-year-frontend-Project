/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "../assets/Ellipse 2 (1).svg";
import person from "../assets/Ellipse 2 (1).svg";
import { API_BASE_URL } from "../base_url";
import { useChatStore } from "../zustand";
import {
  Search,
  Trash2,
  MessageSquare,
  Clock,
  ArrowRight,
  Home,
} from "lucide-react";

interface Chat {
  id: string;
  queryText: string;
  response: string;
  createdAt: string;
}

export default function SavedChat() {
  const navigate = useNavigate();
  const { bears, empty } = useChatStore((state: any) => state);
  const [chats, setChats] = useState<Chat[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredChat, setHoveredChat] = useState<string | null>(null);

  useEffect(() => {
    const fetchChats = async () => {
      const token = localStorage.getItem("healthUserToken");
      const userId = localStorage.getItem("healthUserId");

      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/histories/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch: ${response.status} ${response.statusText}`
          );
        }

        const { data } = await response.json();

        const sortedChats = Array.isArray(data)
          ? data.sort(
              (a: Chat, b: Chat) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
          : [];

        const uniqueChats = sortedChats.filter(
          (chat, index, self) =>
            index === self.findIndex((c) => c.id === chat.id)
        );

        setChats(uniqueChats);
      } catch (error) {
        console.error("Error fetching chats", error);
      }
    };

    fetchChats();
  }, []);

  useEffect(() => {
    const sortedChats = Array.isArray(bears)
      ? bears.sort(
          (a: Chat, b: Chat) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      : [];
    const uniqueChats = sortedChats.filter(
      (chat, index, self) => index === self.findIndex((c) => c.id === chat.id)
    );

    setChats((prev) => [...prev, ...uniqueChats]);
    if (bears.length > 1) {
      empty();
    }
  }, [bears]);

  const filteredChats = chats.filter((chat) =>
    chat.queryText.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleHomePage = () => {
    navigate("/app/health-tips");
  };

  const handleOpenChat = (chatId: string) => {
    navigate(`/app/health-bot/${chatId}`);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    return date.toLocaleString("en-US", options);
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Enhanced Sidebar */}
      <div
        className="hidden lg:flex flex-col bg-gradient-to-br from-[#C0D6E4] to-[#A8C8DC]"
        style={{
          position: "fixed",
          width: "28%",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        {/* Header Section */}
        <div className="sticky top-0 bg-gradient-to-r from-[#72BEEE] to-[#5AA5D8] p-6 shadow-lg z-10">
          <button
            onClick={handleHomePage}
            className="flex items-center gap-3 mb-6 group hover:scale-105 transition-transform duration-200"
          >
            <img
              src={Logo}
              className="w-12 h-12 rounded-full ring-4 ring-white/50"
              alt="Logo"
            />
            <div className="text-left">
              <h2 className="text-white font-bold text-xl">Health AI</h2>
              <p className="text-white/80 text-xs flex items-center gap-1">
                <Home className="w-3 h-3" />
                Back to home
              </p>
            </div>
          </button>

          {/* Title with Icon */}
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white text-2xl font-bold">Saved Chats</h3>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-white/30 bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-white/50 focus:border-white transition-all duration-200 text-gray-700 placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Chat Count */}
          <div className="mt-4 text-white/80 text-sm">
            {filteredChats.length} conversation
            {filteredChats.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Chat List */}
        <div className="p-4 space-y-3 flex-1 custom-scrollbar">
          {filteredChats.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <p className="text-white/60 text-sm">
                {searchTerm ? "No conversations found" : "No saved chats yet"}
              </p>
            </div>
          ) : (
            filteredChats.map((chat, index) => (
              <div
                key={chat.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:scale-[1.02]"
                onMouseEnter={() => setHoveredChat(chat.id)}
                onMouseLeave={() => setHoveredChat(null)}
                onClick={() => handleOpenChat(chat.id)}
                style={{
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                {/* Chat Header */}
                <div className="bg-gradient-to-r from-[#72BEEE] to-[#5AA5D8] p-4 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-white">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-medium">
                      {formatDate(chat.createdAt)}
                    </span>
                    <span className="text-xs opacity-80">
                      • {formatTime(chat.createdAt)}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add delete functionality here
                    }}
                    className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                </div>

                {/* Chat Content */}
                <div className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl">
                      <MessageSquare className="w-5 h-5 text-[#72BEEE]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2 group-hover:text-[#72BEEE] transition-colors">
                        {chat.queryText}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {chat.response}
                      </p>
                    </div>
                  </div>

                  {/* Open Chat Button */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <img
                        src={person}
                        alt="User"
                        className="w-6 h-6 rounded-full ring-2 ring-gray-200"
                      />
                      <span className="text-xs text-gray-500">You</span>
                    </div>
                    <button
                      className={`flex items-center gap-2 text-sm font-medium text-[#72BEEE] hover:text-[#5AA5D8] transition-all duration-200 ${
                        hoveredChat === chat.id ? "translate-x-1" : ""
                      }`}
                    >
                      Open chat
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full lg:ml-[28%]">
        <Outlet />
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
