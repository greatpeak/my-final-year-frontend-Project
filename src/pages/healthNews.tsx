import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import personImage from "../assets/Ellipse 2 (1).svg";
import Cardiovascular from "../assets/download (3).jfif";
import Artificial from "../assets/widescreen-inconvo-sweetener.avif";
import Medicare from "../assets/download (1).jfif";
import Blood from "../assets/download (2).jfif";
import ExpertImage from "../assets/download.jfif";
import {
  ChevronDown,
  LogOut,
  MessageSquare,
  Clock,
  ExternalLink,
  Newspaper,
  TrendingUp,
} from "lucide-react";

interface NewsItem {
  id: number;
  tag: string;
  time: string;
  title: string;
  image: string;
  link: string;
}

export default function HealthNews() {
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setShowProfileDropdown(false);
      }
    };

    if (showProfileDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileDropdown]);

  const news: NewsItem[] = [
    {
      id: 1,
      tag: "Neuroscience",
      time: "2 hours ago",
      title: "Artificial sweeteners and brain aging: What we know so far",
      image: Artificial,
      link: "https://www.medicalnewstoday.com/articles/artificial-sweeteners-and-brain-aging-what-we-know-so-far#1",
    },
    {
      id: 2,
      tag: "Nutrition & Diet",
      time: "5 hours ago",
      title: "What to eat and drink before and after a flu shot: Expert Q&A",
      image: ExpertImage,
      link: "https://www.medicalnewstoday.com/articles/what-eat-drink-before-after-flu-shot-vaccine-questions",
    },
    {
      id: 3,
      tag: "Healthcare Policy",
      time: "1 day ago",
      title: "Medicare costs: 3 key changes in 2026",
      image: Medicare,
      link: "https://www.medicalnewstoday.com/articles/medicare-costs-3-key-changes-in-2026",
    },
    {
      id: 4,
      tag: "Medical Research",
      time: "3 days ago",
      title:
        "Blood vessels in eyes may help predict heart disease and biological…",
      image: Blood,
      link: "https://www.medicalnewstoday.com/articles/blood-vessels-eyes-predict-heart-disease-biological-aging-risk",
    },
    {
      id: 5,
      tag: "Public Health",
      time: "1 week ago",
      title:
        "Walks longer than 10 minutes at a time may have more cardiovascular…",
      image: Cardiovascular,
      link: "https://www.medicalnewstoday.com/articles/walks-longer-10-minutes-cardiovascular-benefits-8000-steps",
    },
  ];

  const tagColors: { [key: string]: string } = {
    Neuroscience: "from-purple-500 to-violet-600",
    "Nutrition & Diet": "from-green-500 to-emerald-600",
    "Healthcare Policy": "from-blue-500 to-indigo-600",
    "Medical Research": "from-red-500 to-rose-600",
    "Public Health": "from-orange-500 to-amber-600",
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setShowProfileDropdown(false);
      }
    };

    if (showProfileDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileDropdown]);

  const toggleProfileDropdown = () => {
    setShowProfileDropdown((prev) => !prev);
  };

  const handlePreviousChats = () => {
    navigate("/app/mobileSavedChat");
    setShowProfileDropdown(false);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("healthUserToken");
      localStorage.removeItem("healthUserId");
      navigate("/login");
      setShowProfileDropdown(false);
    }
  };

  const handleExploreClick = () => {
    navigate("/app/health-tips");
  };

  const handleHealthNewsClick = () => {
    navigate("/app/health-news");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C0D6E4] to-[#A8C8DC] p-6">
      {/* Desktop Header */}
      <div className="hidden md:flex justify-end mb-6" ref={profileDropdownRef}>
        <button
          onClick={toggleProfileDropdown}
          className="flex items-center gap-3 bg-white hover:bg-gray-50 transition-all duration-200 px-4 py-2 rounded-full shadow-md hover:shadow-lg"
        >
          <img
            src={personImage}
            alt="User Avatar"
            className="w-10 h-10 rounded-full ring-2 ring-gray-200"
          />
          <div className="text-left hidden lg:block">
            <p className="text-gray-800 text-sm font-semibold">Profile</p>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
              showProfileDropdown ? "rotate-180" : ""
            }`}
          />
        </button>

        {showProfileDropdown && (
          <div className="absolute right-6 top-20 w-48 bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100 z-50 animate-fadeIn">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 w-full text-left transition-colors duration-150 group"
            >
              <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                <LogOut className="w-4 h-4 text-red-600" />
              </div>
              <span className="text-sm font-medium text-gray-800">Log out</span>
            </button>
          </div>
        )}
      </div>

      {/* Mobile Header */}
      <div className="flex justify-between items-center mb-6 md:hidden">
        <div className="flex items-center relative" ref={profileDropdownRef}>
          <button
            onClick={toggleProfileDropdown}
            className="flex items-center gap-2 bg-white hover:bg-gray-50 transition-all duration-200 px-3 py-2 rounded-full shadow-md"
          >
            <img
              src={personImage}
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
            <ChevronDown
              className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                showProfileDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {showProfileDropdown && (
            <div className="absolute left-0 top-14 w-48 bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100 z-50 animate-fadeIn">
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

        <button
          onClick={handlePreviousChats}
          className="bg-[#72BEEE] flex gap-2 items-center text-white text-sm px-4 py-2 rounded-full shadow-md hover:shadow-lg hover:bg-[#5AA5D8] transition-all duration-200"
        >
          <MessageSquare className="w-5 h-5" />
          <span>Saved chats</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {/* Tab Navigation */}
        <div className="flex gap-1 mb-8 bg-white/10 backdrop-blur-sm p-1.5 rounded-2xl inline-flex">
          <button
            className="px-6 py-2.5 rounded-xl font-bold text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
            onClick={handleExploreClick}
          >
            🔍 Explore
          </button>
          <button
            className="px-6 py-2.5 rounded-xl font-bold text-white bg-white/20 border-2 border-white/40 shadow-lg transition-all duration-200"
            onClick={handleHealthNewsClick}
          >
            📰 Health News
          </button>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
              <Newspaper className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Latest Health News
              </h1>
              <p className="text-white/80 text-sm">
                Stay informed with the latest health updates
              </p>
            </div>
          </div>
        </div>

        {/* News List */}
        <div className="space-y-6">
          {news.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* News Header */}
              <div className="p-5 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span
                    className={`bg-gradient-to-r ${
                      tagColors[item.tag] || "from-gray-500 to-gray-600"
                    } text-white text-xs font-bold px-4 py-2 rounded-full shadow-md`}
                  >
                    {item.tag}
                  </span>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>

              {/* News Content */}
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="px-5 pb-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 group-hover:text-[#72BEEE] transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                        <span className="text-sm font-semibold text-gray-800">
                          Read Article
                        </span>
                        <ExternalLink className="w-4 h-4 text-[#72BEEE]" />
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              {/* News Footer */}
              <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-gray-600">
                      Trending topic
                    </span>
                  </div>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#72BEEE] hover:text-[#5AA5D8] transition-colors"
                  >
                    Read more →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-8 text-center">
          <a
            href="https://www.medicalnewstoday.com/news"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-800 font-semibold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group"
          >
            <Newspaper className="w-5 h-5 text-[#72BEEE]" />
            <span>View All Health News</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
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
          animation: fadeIn 0.2s ease-out;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
