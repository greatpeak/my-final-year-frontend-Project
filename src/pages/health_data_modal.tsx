import React, { useState, ChangeEvent } from "react";

interface FormData {
  [key: string]: string; // Supports dynamic custom fields
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

  const [customFields, setCustomFields] = useState<{ label: string; value: string }[]>([]);

  const [newCustomField, setNewCustomField] = useState({
    label: "",
    value: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      ...Object.fromEntries(customFields.map((field) => [field.label, field.value])),
    };

    localStorage.setItem("userHealthData", JSON.stringify(allData));
    alert("Health data saved successfully!");
    onClose(); // Close the modal
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

  const removeCustomField = (index: number) => {
    setCustomFields((prev) => prev.filter((_, i) => i !== index));
  };



  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-screen overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Your Health Data</h2>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto max-h-[calc(100vh-200px)]">
          <div className="space-y-4">
            {/* Predefined Fields */}
            {Object.keys(formData).map((field) => (
              <div key={field} className="space-y-1">
                <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <select
                  name={field}
                  id={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
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

            {/* Custom Fields */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-800">Custom Fields</h3>
              <input
                type="text"
                name="label"
                value={newCustomField.label}
                onChange={handleCustomFieldChange}
                placeholder="Label"
                className="block w-full rounded-md border-gray-300 shadow-sm"
              />
              <input
                type="text"
                name="value"
                value={newCustomField.value}
                onChange={handleCustomFieldChange}
                placeholder="Value"
                className="block w-full rounded-md border-gray-300 shadow-sm"
              />
              <button
                type="button"
                onClick={addCustomField}
                className="py-2 px-4 bg-green-500 text-white rounded-md"
              >
                Add Field
              </button>
            </div>
          </div>
        </div>

        {customFields.length > 0 && (
          <div className="mt-4 space-y-2">
            <h3 className="text-sm font-semibold text-gray-800">Your Custom Data</h3>
            <ul className="space-y-1">
              {customFields.map((field, index) => (
                <li key={index} className="flex justify-between items-center text-gray-700">
                  <span>
                    <strong>{field.label}:</strong> {field.value}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeCustomField(index)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-200 flex justify-between items-center">
          <button
            onClick={onClose}
            className="py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
           
            onClick={handleSubmit}
            className="py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default HealthDataModal;
