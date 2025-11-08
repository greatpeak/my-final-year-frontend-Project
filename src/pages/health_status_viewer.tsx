import React, { useEffect, useState, useRef } from "react";

interface HealthStatusViewerProps {
  onClose: () => void;
}

const HealthStatusViewer: React.FC<HealthStatusViewerProps> = ({ onClose }) => {
  const [healthData, setHealthData] = useState<{ [key: string]: string }>({});
  const modalRef = useRef<HTMLDivElement>(null);

  // Fetch health data from localStorage on component mount
  useEffect(() => {
    const savedData = JSON.parse(
      localStorage.getItem("userHealthData") || "{}"
    );
    setHealthData(savedData);
  }, []);

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gradient-to-br from-blue-100 to-blue-50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col"
      >
        {/* Header */}
        <div className="text-center flex-shrink-0">
          <h2 className="text-3xl font-extrabold text-blue-700">
            Your Health Status
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Below is the health data you have provided. Please review it for
            accuracy.
          </p>
        </div>

        {/* Scrollable content */}
        <div className="mt-6 space-y-4 overflow-y-auto flex-grow px-4 pr-2 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-hide scrollbar-track-blue-100">
          {Object.keys(healthData).length > 0 ? (
            <ul className="space-y-2">
              {Object.entries(healthData).map(([key, value]) => (
                <li
                  key={key}
                  className="flex justify-between items-center border-b py-2"
                >
                  <span className="font-medium text-gray-800 capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </span>
                  <span className="text-gray-600">{value || "N/A"}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">
              No health data available.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200 mt-4 flex-shrink-0">
          <button
            onClick={onClose}
            className="py-2 px-4 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default HealthStatusViewer;
