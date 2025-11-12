import { useState, useEffect, ChangeEvent, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import personImage from "../assets/Ellipse 2 (1).svg";
import robotImage from "../assets/Graident_Ai_Robot_1-removebg-preview 1.svg";
import { API_BASE_URL } from "../base_url";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ChevronDown,
  LogOut,
  ArrowLeft,
  Menu,
  Bot,
  Sparkles,
} from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function HealthBot() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { chatId } = useParams<{ chatId: string }>();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [queryId, setQueryId] = useState<string>("no-queryId");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchPreviousMessages = async () => {
      if (!chatId) return;

      const token = localStorage.getItem("healthUserToken");
      if (!token) {
        console.error("Missing token. Redirect to login.");
        return;
      }
      try {
        if (chatId !== "new") {
          const response = await fetch(`${API_BASE_URL}/histories/${chatId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error(
              `Failed to fetch chat history: ${response.statusText}`
            );
          }

          const data = await response.json();

          const previousMessages = data.data.children
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((msg: any) => {
              // Create an array for each message pair
              return [
                { sender: "user", text: msg.queryText },
                { sender: "bot", text: msg.response },
              ];
            })
            .flat(); 

          setMessages(previousMessages);

          if (data.data.children.length > 0) {
            setQueryId(chatId);
          }
        } else {
          setMessages([]);
        }
      } catch (error) {
        console.error("Error fetching previous messages:", error);
      }
    };

    fetchPreviousMessages();
  }, [chatId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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

  const handleGoBack = () => {
    navigate(-1);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
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

const sendMessage = async () => {
  const token = localStorage.getItem("healthUserToken");
  const healthUserId = localStorage.getItem("healthUserId");
  if (!token) {
    navigate("/app/health-tips");
    return;
  }
  if (message.trim() === "") return;

  const userId = localStorage.getItem("healthUserId");
  if (!userId) {
    console.error("User ID is missing. Please log in again.");
    return;
  }

  // Store the message and clear input immediately
  const currentMessage = message;
  setMessage("");

  // Add user message to chat immediately
  setMessages((prev) => [...prev, { sender: "user", text: currentMessage }]);

  setLoading(true);

  try {
    const userHealthData = localStorage.getItem("userHealthData");
    const healthInfo = userHealthData ? JSON.parse(userHealthData) : {};

    const requestBody = {
      userId,
      queryText: currentMessage,
      authId: healthUserId,
      queryId,
      healthInfo,
    };

    const response = await fetch(`${API_BASE_URL}/prompt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    const type = data["type"];

    if (type === "newChat") {
      const resMsg = data["data"]["message"];
      const resMsgQuery = data["data"]["query"];
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: resMsg.response },
      ]);
      setQueryId(resMsgQuery.id);
    } else if (type === "continuation") {
      const resMsg = data["data"]["message"];
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: resMsg.response },
      ]);
      setQueryId(resMsg.queryId);
    }

    setLoading(false);
  } catch (error) {
    console.error("Error sending message:", error);
    setLoading(false);
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: "Sorry, something went wrong." },
    ]);
  }
};

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#C0D6E4] to-[#A8C8DC]">
      {/* Desktop Header */}
      <div className="hidden md:flex justify-between items-center p-4 bg-gradient-to-r from-[#72BEEE] to-[#5AA5D8] shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-xl">
              Health AI Assistant
            </h1>
            <p className="text-white/80 text-sm">
              Your personalized health companion
            </p>
          </div>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-3 bg-white/20 hover:bg-white/30 transition-all duration-200 px-4 py-2 rounded-full shadow-md backdrop-blur-sm"
          >
            <img
              src={personImage}
              alt="User Avatar"
              className="w-10 h-10 rounded-full ring-2 ring-white/50"
            />
            <div className="text-left hidden lg:block">
              <p className="text-white text-sm font-semibold">User</p>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-white transition-transform duration-200 ${
                showDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {showDropdown && (
            <div className="absolute right-0 top-14 w-48 bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100 z-50 animate-fadeIn">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 w-full text-left transition-colors duration-150 group"
              >
                <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                  <LogOut className="w-4 h-4 text-red-600" />
                </div>
                <span className="text-sm font-medium text-gray-800">
                  Log out
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden bg-gradient-to-r from-[#72BEEE] to-[#5AA5D8] shadow-lg">
        <div className="flex justify-between items-center px-4 py-3">
          <button
            onClick={handleGoBack}
            className="p-2 hover:bg-white/20 rounded-full transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-white" />
            <h3 className="font-semibold text-white">Health AI</h3>
          </div>
          <button
            onClick={toggleDropdown}
            className="p-2 hover:bg-white/20 rounded-full transition-all duration-200"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>
        </div>

        {showDropdown && (
          <div className="bg-white/10 backdrop-blur-md border-t border-white/20 px-4 py-3 animate-slideDown">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-2 bg-white/90 hover:bg-white rounded-xl transition-all duration-200"
            >
              <LogOut className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-gray-800">Log out</span>
            </button>
          </div>
        )}
      </div>

      {/* Messages Area */}
      <div
        className="flex-grow p-4 space-y-6 overflow-y-auto pb-32 custom-scrollbar"
        style={{ scrollbarWidth: "none" }}
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="p-6 bg-white/30 backdrop-blur-sm rounded-3xl mb-4">
              <Sparkles className="w-16 h-16 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Start a Conversation
            </h2>
            <p className="text-white/80 text-sm max-w-md">
              Ask me anything about your health, symptoms, or wellness tips. I'm
              here to help!
            </p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              } animate-fadeIn`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {msg.sender === "bot" && (
                <div className="flex-shrink-0">
                  <div className="p-2 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl shadow-md">
                    <img src={robotImage} alt="AI" className="h-6 w-6" />
                  </div>
                </div>
              )}

              <div
                className={`max-w-[85%] md:max-w-[70%] ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-[#72BEEE] to-[#5AA5D8] text-white shadow-lg"
                    : "bg-white text-gray-800 shadow-md"
                } p-4 rounded-3xl ${
                  msg.sender === "user" ? "rounded-tr-md" : "rounded-tl-md"
                }`}
              >
                <ReactMarkdown
                  className={`text-sm md:text-base prose prose-sm max-w-none ${
                    msg.sender === "user" ? "prose-invert" : ""
                  }`}
                  remarkPlugins={[remarkGfm]}
                >
                  {msg.text}
                </ReactMarkdown>
              </div>

              {msg.sender === "user" && (
                <div className="flex-shrink-0">
                  <img
                    src={personImage}
                    alt="User"
                    className="h-10 w-10 rounded-full ring-2 ring-white/50 shadow-md"
                  />
                </div>
              )}
            </div>
          ))
        )}

        {loading && (
          <div className="flex items-start gap-3 animate-fadeIn">
            <div className="flex-shrink-0">
              <div className="p-2 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl shadow-md">
                <img src={robotImage} alt="AI" className="h-6 w-6" />
              </div>
            </div>
            <div className="bg-white p-4 rounded-3xl rounded-tl-md shadow-md">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-[#72BEEE] rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-[#72BEEE] rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-[#72BEEE] rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Input Section */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#C0D6E4] via-[#C0D6E4] to-transparent  md:ml-[28%] z-20">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#72BEEE] via-[#5AA5D8] to-[#72BEEE] rounded-3xl blur-sm opacity-60"></div>

            {/* Input container */}
            <div className="relative bg-white rounded-3xl shadow-2xl border-2 border-white/50 backdrop-blur-sm overflow-hidden">
              {/* Character counter */}
              {message.length > 0 && (
                <div className="absolute -top-8 right-2 text-xs text-white bg-[#72BEEE]/80 px-3 py-1 rounded-full backdrop-blur-sm">
                  {message.length} characters
                </div>
              )}

              <div className="flex items-center gap-2 p-2">
                {/* Input field */}
                <input
                  type="text"
                  value={message}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !loading && message.trim()) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Ask your health AI anything..."
                  className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-sm md:text-base text-gray-800 placeholder-gray-400"
                />

                {/* Send button */}
                <button
                  onClick={sendMessage}
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
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }

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

        .prose h1, .prose h2, .prose h3 {
          margin-top: 1em;
          margin-bottom: 0.5em;
        }

        .prose p {
          margin-bottom: 0.75em;
        }

        .prose ul, .prose ol {
          margin-top: 0.5em;
          margin-bottom: 0.5em;
        }

        .prose code {
          background-color: rgba(0, 0, 0, 0.1);
          padding: 0.2em 0.4em;
          border-radius: 0.25em;
          font-size: 0.9em;
        }

        .prose-invert code {
          background-color: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
