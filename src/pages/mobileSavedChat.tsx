import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import searchIcon from "../assets/search.svg";
import deleteIcon from "../assets/Trash.svg";
import arrow from "../assets/Vector.svg";
import personIcon from "../assets/Ellipse 2 (1).svg";
import { API_BASE_URL } from "../base_url";

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(); 
  };

  return (
    <div className="bg-[#C0D6E4] min-h-screen p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <button onClick={handleGoBack}>
          <img src={arrow} alt="Back Arrow" className="w-[13px] h-[9.5px]" />
        </button>
        <div className="text-white font-semibold text-base">Saved chats</div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <img
          src={searchIcon}
          alt="Search"
          className="absolute left-3 top-3 w-4 h-4 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search for message"
          className="w-full pl-10 pr-4 py-2 rounded-md text-gray-600 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Chat Cards */}
      <div className="space-y-4">
        {filteredChats.map((chat) => (
          <div key={chat.id} className="bg-[#72BEEE] p-4 rounded-2xl shadow-sm">
            {/* Top Section */}
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-white">
                {formatDate(chat.createdAt)}
              </span>
              <img src={deleteIcon} alt="Delete Icon" className="w-4 h-4" />
            </div>

            {/* Chat Description */}
            <p className="text-sm text-white mb-3">{chat.queryText}</p>

            {/* Bottom Section */}
            <div className="flex items-center gap-2">
              <img
                src={personIcon}
                alt="Person Icon"
                className="w-6 h-6 rounded-full"
              />
              <button
                className="text-sm text-white underline"
                onClick={() => handleOpenChat(chat.id)}
              >
                Open chat
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
