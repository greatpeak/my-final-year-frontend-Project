import React, { useState, ChangeEvent } from "react";
import {
  X,
  Plus,
  Trash2,
  Heart,
  Activity,
  Droplet,
  Pill,
  AlertCircle,
  Stethoscope,
  Wind,
  Shield,
} from "lucide-react";

interface FormData {
  [key: string]: string;
}

interface HealthDataModalProps {
  onClose: () => void;
}

const HealthDataModal: React.FC<HealthDataModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    bloodGroup: "",
    hivStatus: "",
    ulcer: "",
    diabetes: "",
    hypertension: "",
    malaria: "",
    sickleCell: "",
    asthma: "",
  });

  const [customFields, setCustomFields] = useState<
    { label: string; value: string }[]
  >([]);
  const [newCustomField, setNewCustomField] = useState({
    label: "",
    value: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCustomFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCustomField((prev) => ({ ...prev, [name]: value }));
  };

  const addCustomField = () => {
    if (newCustomField.label.trim() && newCustomField.value.trim()) {
      setCustomFields((prev) => [
        ...prev,
        { label: newCustomField.label, value: newCustomField.value },
      ]);
      setNewCustomField({ label: "", value: "" });
    }
  };

  const handleSubmit = () => {
    const allData = {
      ...formData,
      ...Object.fromEntries(
        customFields.map((field) => [field.label, field.value])
      ),
    };

    const cleanedData = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(allData).filter(([_, value]) => value.trim() !== "")
    );

    localStorage.setItem("userHealthData", JSON.stringify(cleanedData));
    alert("Health data saved successfully!");
    onClose();
  };

  const dropdownOptions: { [key: string]: string[] } = {
    bloodGroup: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    hivStatus: ["Positive", "Negative", "Unknown"],
    ulcer: ["Yes", "No"],
    diabetes: ["Yes", "No"],
    hypertension: ["Yes", "No"],
    malaria: ["Yes", "No"],
    sickleCell: ["Yes", "No"],
    asthma: ["Yes", "No"],
  };

  const fieldIcons: { [key: string]: React.ReactNode } = {
    bloodGroup: <Droplet className="w-4 h-4" />,
    hivStatus: <Shield className="w-4 h-4" />,
    ulcer: <AlertCircle className="w-4 h-4" />,
    diabetes: <Activity className="w-4 h-4" />,
    hypertension: <Heart className="w-4 h-4" />,
    malaria: <Pill className="w-4 h-4" />,
    sickleCell: <Stethoscope className="w-4 h-4" />,
    asthma: <Wind className="w-4 h-4" />,
  };

  const fieldColors: { [key: string]: string } = {
    bloodGroup: "from-red-500 to-red-600",
    hivStatus: "from-purple-500 to-purple-600",
    ulcer: "from-orange-500 to-orange-600",
    diabetes: "from-blue-500 to-blue-600",
    hypertension: "from-pink-500 to-pink-600",
    malaria: "from-yellow-500 to-yellow-600",
    sickleCell: "from-teal-500 to-teal-600",
    asthma: "from-cyan-500 to-cyan-600",
  };

  const removeCustomField = (index: number) => {
    setCustomFields((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFieldName = (field: string) => {
    return field
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-slideUp">
        {/* Modal Header */}
        <div className="relative bg-gradient-to-r from-[#72BEEE] to-[#5AA5D8] p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                Your Health Profile
              </h2>
              <p className="text-white/80 text-sm mt-1">
                Manage your health information
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-220px)] custom-scrollbar">
          {/* Predefined Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {Object.keys(formData).map((field) => (
              <div key={field} className="group">
                <label
                  htmlFor={field}
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"
                >
                  <div
                    className={`p-1.5 bg-gradient-to-r ${fieldColors[field]} rounded-lg text-white`}
                  >
                    {fieldIcons[field]}
                  </div>
                  {formatFieldName(field)}
                </label>
                <select
                  name={field}
                  id={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#72BEEE] focus:ring-4 focus:ring-[#72BEEE]/20 transition-all duration-200 bg-gray-50 hover:bg-white cursor-pointer text-sm"
                >
                  <option value="">Select an option</option>
                  {dropdownOptions[field]?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-sm font-semibold text-gray-500">
                Custom Health Information
              </span>
            </div>
          </div>

          {/* Custom Fields Section */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-2xl border-2 border-blue-100">
              <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#72BEEE]" />
                Add Custom Field
              </h3>
              <div className="space-y-3">
                <input
                  type="text"
                  name="label"
                  value={newCustomField.label}
                  onChange={handleCustomFieldChange}
                  placeholder="Field name (e.g., Allergies)"
                  className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#72BEEE] focus:ring-4 focus:ring-[#72BEEE]/20 transition-all duration-200 text-sm"
                />
                <input
                  type="text"
                  name="value"
                  value={newCustomField.value}
                  onChange={handleCustomFieldChange}
                  placeholder="Value (e.g., Peanuts, Dust)"
                  className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#72BEEE] focus:ring-4 focus:ring-[#72BEEE]/20 transition-all duration-200 text-sm"
                />
                <button
                  type="button"
                  onClick={addCustomField}
                  className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Field
                </button>
              </div>
            </div>

            {/* Display Custom Fields */}
            {customFields.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#72BEEE]" />
                  Your Custom Data ({customFields.length})
                </h3>
                <div className="space-y-2">
                  {customFields.map((field, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-100 hover:border-purple-200 transition-all duration-200 group"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">
                          {field.label}
                        </p>
                        <p className="text-sm text-gray-600 mt-0.5">
                          {field.value}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeCustomField(index)}
                        className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-all duration-200 ml-3"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t-2 border-gray-100 bg-gray-50 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-6 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-[#72BEEE] to-[#5AA5D8] text-white rounded-xl font-semibold hover:from-[#5AA5D8] hover:to-[#4A9AC8] transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Save Changes
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #72BEEE;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #5AA5D8;
        }
      `}</style>
    </div>
  );
};

export default HealthDataModal;
