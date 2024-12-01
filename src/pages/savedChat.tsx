/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "../assets/Frame 1.svg";
import search from "../assets/search.svg";
import Delete from "../assets/Trash.svg";
import person from "../assets/Ellipse 2 (1).svg";
import { API_BASE_URL } from "../base_url";
import { useChatStore } from "../zustand";

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

  useEffect(() => {
    const fetchChats = async () => {
      const token = localStorage.getItem("healthUserToken");
      const userId = localStorage.getItem("healthUserId");

      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/histories/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const { data } = await response.json();

        const sortedChats = Array.isArray(data)
          ? data.sort(
              (a: Chat, b: Chat) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
          : [];

        const uniqueChats = sortedChats.filter(
          (chat, index, self) => index === self.findIndex((c) => c.id === chat.id)
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
          (a: Chat, b: Chat) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
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

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className="hidden lg:flex flex-col p-4 border-r-2 bg-[#C0D6E4]"
        style={{
          position: "fixed",
          width: "25%",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <div className="sticky ">
          <img
            src={Logo}
            onClick={handleHomePage}
            className="w-[149px] h-[36px] mb-3 cursor-pointer"
            alt="Logo"
          />
          <h6 className="text-white mb-3">Saved Chat</h6>
          <div className="relative">
            <img src={search} alt="Search Icon" className="absolute left-2 top-3 text-gray-300" />
            <input
              type="text"
              placeholder="Search for message"
              className="w-full px-7 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4 space-y-4">
          {filteredChats.map((chat) => (
            <div key={chat.id} className="bg-[#72BEEE] p-3 rounded-2xl shadow-sm flex flex-col">
              <div className="flex justify-between mb-3">
                <button>
                  <span className="text-xs text-white">{formatTime(chat.createdAt)}</span>
                </button>
                <button>
                  <img src={Delete} alt="Delete Icon" />
                </button>
              </div>
              <p className="text-sm text-white font-medium">{chat.queryText}</p>
              <p className="text-xs text-white truncate">{chat.response}</p>
              <div className="align-left flex align-middle mt-2 gap-2 items-center">
                <img src={person} alt="Person Icon" />
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
      <div className="w-full md:ml-[25%]">
        <Outlet />
      </div>
    </div>
  );
}
