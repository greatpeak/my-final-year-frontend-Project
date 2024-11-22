import { Outlet, useNavigate } from "react-router-dom";
import Logo from "../assets/Frame 1.svg";
import search from "../assets/search.svg";
import Delete from "../assets/Trash.svg";
import Time from "../assets/Frame 1000002388.png";
import person from "../assets/Ellipse 2 (1).svg";

export default function SavedChat() {
  const navigate = useNavigate(); // useNavigate hook to navigate programmatically

  const handleOpenChat = () => {
    navigate("/loginIn/health-bot"); // Navigate to the health-bot route
  };

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
          />
        </div>
        <div className="mt-4 flex-grow space-y-4">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
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
              <p className="text-sm text-white">
                Stages of diabetes are categorized based on the condition of the
                patient. It is advised th...
              </p>
              <div className="algin-left flex align-middle mt-2 gap-2 items-center">
                <img src={person} alt="" />
                <button
                  className="mt-2 text-white hover:underline text-sm"
                  onClick={handleOpenChat} // Navigate to health-bot when clicked
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
