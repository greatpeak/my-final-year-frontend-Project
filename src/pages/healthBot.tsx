import { useState, useEffect, ChangeEvent, useRef } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import personImage from "../assets/Ellipse 2 (1).svg";
import send from "../assets/Send.svg";
import robotImage from "../assets/Graident_Ai_Robot_1-removebg-preview 1.svg";
import arrow from "../assets/Arrow-Left.svg";
import menu from "../assets/Menu-Alt-2.svg";
import { API_BASE_URL } from "../base_url";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function HealthBot() {
  const navigate = useNavigate();
  const { chatId } = useParams<{ chatId: string }>();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [queryId, setQueryId] = useState<string>("no-queryId");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  const fetchPreviousMessages = async () => {
    if (!chatId) return;

    const token = localStorage.getItem("healthUserToken");
    if (!token) {
      console.error("Missing token. Redirect to login.");
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/histories/${chatId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch chat history: ${response.statusText}`);
      }

      const data = await response.json();
      const previousMessages = data.data.children
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((msg: any) => {
          const messages: Message[] = [];
          if (msg.createdAt) {
            messages.push({ sender: "user", text: msg.queryText });
            messages.push({ sender: "bot", text: msg.response });
          }
          return messages;
        })
        .flat();

      setMessages(previousMessages);
    } catch (error) {
      console.error("Error fetching previous messages:", error);
    }
  };

  fetchPreviousMessages();
}, [chatId]);

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
      return <Navigate to="/app/health-tips" replace />;
    }
    if (message.trim() === "") return;

    const userId = localStorage.getItem("healthUserId");
    if (!userId) {
      console.error("User ID is missing. Please log in again.");
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
          userId,
          queryText: message,
          authId: healthUserId,
          queryId,
        }),
      });
      const data = await response.json();
      const type = data["type"];
      if (type === "newChat") {
        const resMsg = data["data"]["message"];
        const resMsgQuery = data["data"]["query"];
        setMessages((prev) => [
          ...prev,
          { sender: "user", text: resMsg.queryText },
          { sender: "bot", text: resMsg.response },
        ]);
        setQueryId(resMsgQuery.id);
      } else if (type === "continuation") {
        const resMsg = data["data"]["message"];
        setMessages((prev) => [
          ...prev,
          { sender: "user", text: resMsg.queryText },
          { sender: "bot", text: resMsg.response },
        ]);
        setQueryId(resMsg.queryId);
      }
      setMessage("");
      console.log("Response:", data["data"], data["type"]);
    } catch (error) {
      console.error("Error sending message:", error);
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
    <div className="min-h-screen flex flex-col  bg-[#C0D6E4]">
      <div className="hidden md:flex justify-end mt-3 mr-2">
        <img
          src={personImage}
          alt="User Avatar"
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={toggleDropdown}
        />
        <p className="ml-3 text-sm text-white font-semibold hidden md:block">
          johndoe@gmail.com
        </p>
        {showDropdown && (
          <div className="absolute right-6 top-8 mt-2 w-40 bg-white shadow-lg rounded-md text-gray-700">
            <button
              onClick={handleLogout}
              className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
            >
              Log out
            </button>
          </div>
        )}
      </div>
      <div className="w-full bg-white md:hidden justify-between h-[56px] items-center px-2 flex">
        <button onClick={handleGoBack}>
          <img src={arrow} alt="Back Arrow" />
        </button>
        <h3 className="font-medium">Health Bot</h3>
        <button onClick={toggleDropdown}>
          <img src={menu} alt="Menu" />
        </button>
      </div>

      <div className="flex-grow p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-120px)]">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start space-x-3 ${
              msg.sender === "user" ? "justify-end" : ""
            }`}
          >
            {msg.sender === "bot" ? (
              <img src={robotImage} alt="" className="h-[24px] w-[20px]" />
            ) : (
              <img src={personImage} alt="" className="h-auto w-auto" />
            )}
            <div
              className={`p-3 rounded-lg shadow-md ${
                msg.sender === "user" ? "bg-[#72BEEE] text-white" : "bg-white"
              } max-w-[80%] break-words`}
            >
              <ReactMarkdown
                className="text-sm md:text-base"
                remarkPlugins={[remarkGfm]}
              >
                {msg.text}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        <div className="h-[10vh]" />
        {/* Scroll to bottom anchor */}
        <div ref={messagesEndRef} />
      </div>

      <div className="fixed bottom-6 right-0 w-full max-w-[761px] flex items-center p-3 md:bottom-6 md:right-14">
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="Type message"
          className="flex-grow relative p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm md:text-base"
        />
        <button className="absolute right-6 md:right-4" onClick={sendMessage}>
          <img src={send} alt="Send" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
