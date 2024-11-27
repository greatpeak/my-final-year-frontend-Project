import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import personImage from "../assets/Ellipse 2 (1).svg";
import send from "../assets/Send.svg";
import robotImage from "../assets/Graident_Ai_Robot_1-removebg-preview 1.svg";
import arrow from "../assets/Arrow-Left.svg";
import menu from "../assets/Menu-Alt-2.svg";
import { API_BASE_URL } from "../base_url";

// Define types for message structure
interface Message {
  sender: "user" | "bot";
  text: string;
}

// Define the structure of the API response
interface BotResponse {
  reply: string;
}

export default function HealthBot() {
  const navigate = useNavigate();

  // State for dropdown visibility and user message input
  const [showDropdown, setShowDropdown] = useState<boolean>(false); // Dropdown visibility state
  const [message, setMessage] = useState<string>(""); // User's message input state
  const [messages, setMessages] = useState<Message[]>([
    // Messages state (array of Message objects)
    { sender: "bot", text: "What question should I help you with?" },
  ]);

  // Go back to the previous page
  const handleGoBack = () => {
    navigate(-1);
  };

  // Toggle dropdown menu visibility
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // Handle user logout
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
  if (message.trim() === "") return;

  setMessages((prev) => [...prev, { sender: "user", text: message }]);

  const userId = localStorage.getItem("healthUserId");
  if (!userId) {
    console.error("User ID is missing. Please log in again.");
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: "Please log in to continue." },
    ]);
    return;
  }

  const queryId = Date.now().toString(); // Generate a unique query ID
  localStorage.setItem("queryId", queryId);

  const payload = {
    userId,
    queryText: message,
    queryId,
  };

  console.log("Request Payload:", payload);

  try {
    const response = await fetch(`${API_BASE_URL}/prompt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("Response:", data);

    if (response.ok && data.reply) {
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } else {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.message || "An error occurred." },
      ]);
    }

    await updateMessageHistory(queryId, { sender: "user", text: message });
    await updateMessageHistory(queryId, { sender: "bot", text: data.reply });

    setMessage(""); // Clear input
  } catch (error) {
    console.error("Error sending message:", error);
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: "Sorry, something went wrong." },
    ]);
  }
};




const updateMessageHistory = async (historyId: string, message: Message) => {
  try {
    const queryParams = new URLSearchParams({
      sender: message.sender,
      text: message.text,
    }).toString();

    const response = await fetch(
      `${API_BASE_URL}/histories/${historyId}?${queryParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      console.log("Message history retrieved successfully.");
    } else {
      console.error("Failed to retrieve message history.");
    }
  } catch (error) {
    console.error("Error retrieving message history:", error);
  }
};


  // Handle input field change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#C0D6E4]">
      {/* Desktop only */}
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

      {/* Mobile Header */}
      <div className="w-full bg-white md:hidden justify-between h-[56px] items-center px-2 flex">
        <button onClick={handleGoBack}>
          <img src={arrow} alt="Back Arrow" />
        </button>
        <h3 className="font-medium">Health Bot</h3>
        <button onClick={toggleDropdown}>
          <img src={menu} alt="Menu" />
        </button>
      </div>

      {/* Chat Section */}
      <div className="flex-grow p-4 space-y-4">
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
              <p className="text-sm md:text-base">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
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
