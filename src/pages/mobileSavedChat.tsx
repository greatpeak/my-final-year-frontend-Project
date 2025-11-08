import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import personIcon from "../assets/Ellipse 2 (1).svg";
import { API_BASE_URL } from "../base_url";
import {
  Search,
  Trash2,
  MessageSquare,
  Clock,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

interface Chat {
  id: string;
  queryText: string;
  response: string;
  createdAt: string;
}

export default function MobileSavedChat() {
  const navigate = useNavigate();
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

  const filteredChats = chats.filter((chat) =>
    chat.queryText.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGoBack = () => {
    navigate(-1);
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
        year: "numeric",
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#C0D6E4] to-[#A8C8DC] min-h-screen">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-[#72BEEE] to-[#5AA5D8] p-6 shadow-lg sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={handleGoBack}
            className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-xl">Saved Chats</h1>
              <p className="text-white/80 text-xs">
                {filteredChats.length} conversation
                {filteredChats.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl text-gray-700 border-2 border-white/30 bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-white/50 focus:border-white transition-all duration-200 placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Chat Cards */}
      <div className="p-4 space-y-4">
        {filteredChats.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex p-6 bg-white/30 rounded-3xl mb-4 backdrop-blur-sm">
              <MessageSquare className="w-16 h-16 text-white/60" />
            </div>
            <p className="text-white/80 text-base font-medium">
              {searchTerm ? "No conversations found" : "No saved chats yet"}
            </p>
            <p className="text-white/60 text-sm mt-2">
              {searchTerm
                ? "Try a different search term"
                : "Start a new conversation to see it here"}
            </p>
          </div>
        ) : (
          filteredChats.map((chat, index) => (
            <div
              key={chat.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 active:scale-98"
              onTouchStart={() => setHoveredChat(chat.id)}
              onTouchEnd={() => setHoveredChat(null)}
              onClick={() => handleOpenChat(chat.id)}
              style={{
                animationDelay: `${index * 0.05}s`,
              }}
            >
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-[#72BEEE] to-[#5AA5D8] p-4 flex justify-between items-center">
                <div className="flex items-center gap-2 text-white flex-1 min-w-0">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-medium truncate">
                    {formatDate(chat.createdAt)}
                  </span>
                  <span className="text-xs opacity-80 flex-shrink-0">
                    • {formatTime(chat.createdAt)}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add delete functionality here
                  }}
                  className="p-2 hover:bg-white/20 active:bg-white/30 rounded-lg transition-colors ml-2 flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Chat Content */}
              <div className="p-4">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-[#72BEEE]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2">
                      {chat.queryText}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {chat.response}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <img
                      src={personIcon}
                      alt="User"
                      className="w-7 h-7 rounded-full ring-2 ring-gray-200"
                    />
                    <span className="text-xs text-gray-500 font-medium">
                      You
                    </span>
                  </div>
                  <button
                    className={`flex items-center gap-2 text-sm font-semibold text-[#72BEEE] active:text-[#5AA5D8] transition-all duration-200 ${
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

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .active:scale-98:active {
          transform: scale(0.98);
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
