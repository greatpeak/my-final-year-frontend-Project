import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "../assets/Frame 1.svg";
import search from "../assets/search.svg";
import Delete from "../assets/Trash.svg";
import Time from "../assets/Frame 1000002388.png";
import person from "../assets/Ellipse 2 (1).svg";
import { API_BASE_URL } from "../base_url";

export default function SavedChat() {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchChats = async () => {
      const token = localStorage.getItem("skillUserToken");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/histories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        setChats(data); 
      } catch (error) {
        console.error("Error fetching chats", error);
      }
    };

    fetchChats();
  }, []);

  const handleOpenChat = (chatId) => {
    navigate(`/app/health-bot/${chatId}`); 
  };

  const filteredChats = chats.filter((chat) =>
    chat.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex w-full h-auto">
      {/* Sidebar */}
      <div className="hidden lg:flex w-1/4 bg-[#C0D6E4] flex-col p-4 border-r-2">
        <img src={Logo} className="w-[149px] h-[36px] mb-3" alt="" />
        <h6 className="text-white mb-3">Saved Chat</h6>
        <div className="relative">
          <img
            src={search}
            alt=""
            className="absolute left-2 top-3 text-gray-300"
          />
          <input
            type="text"
            placeholder="Search for message"
            className="w-full px-7 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="mt-4 flex-grow space-y-4">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              className="bg-[#72BEEE] p-3 rounded-2xl shadow-sm flex flex-col"
            >
              <div className="flex justify-between mb-3">
                <button>
                  <img src={Time} alt="" />
                </button>
                <button>
                  <img src={Delete} alt="" />
                </button>
              </div>
              <p className="text-sm text-white truncate">{chat.message}</p>
              <div className="algin-left flex align-middle mt-2 gap-2 items-center">
                <img src={person} alt="" />
                <button
                  className="mt-2 text-white hover:underline text-sm"
                  onClick={() => handleOpenChat(chat.id)}
                >
                  Open chat
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full lg:w-3/4">
        <Outlet />
      </div>
    </div>
  );
}
