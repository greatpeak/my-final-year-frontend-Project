import { useNavigate } from "react-router-dom";
import searchIcon from "../assets/search.svg";
import deleteIcon from "../assets/Trash.svg";
import arrow from "../assets/Vector.svg";
import timeIcon from "../assets/Frame 1000002388.png";
import personIcon from "../assets/Ellipse 2 (1).svg";

export default function MobileSavedChat() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleOpenChat = () => {
    navigate("/loginIn/health-bot"); // Navigate to health-bot page
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
        />
      </div>

      {/* Chat Cards */}
      <div className="space-y-4">
        {[...Array(2)].map((_, index) => (
          <div key={index} className="bg-[#72BEEE] p-4 rounded-2xl shadow-sm">
            {/* Top Section */}
            <div className="flex justify-between items-center mb-3">
              <img src={timeIcon} alt="Time Icon" className="w-4 h-4" />
              <img src={deleteIcon} alt="Delete Icon" className="w-4 h-4" />
            </div>

            {/* Chat Description */}
            <p className="text-sm text-white mb-3">
              Stages of diabetes are categorized based on the condition of the
              patient. It is advised th...
            </p>

            {/* Bottom Section */}
            <div className="flex items-center gap-2">
              <img
                src={personIcon}
                alt="Person Icon"
                className="w-6 h-6 rounded-full"
              />
              <button
                className="text-sm text-white underline"
                onClick={handleOpenChat} // Navigate on button click
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
