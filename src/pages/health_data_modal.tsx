import React, { useState, ChangeEvent, FormEvent } from "react";

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gradient-to-br from-blue-100 to-blue-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-hidden">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-blue-700">Your Health Data is Crucial!</h2>
          <p className="mt-2 text-sm text-gray-600">
            Please provide accurate health details for a safer and personalized experience. All data
            is confidential.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 overflow-y-auto max-h-[65vh] px-4">
          {/* Predefined Fields */}
          {Object.keys(formData).map((field) => (
            <div key={field} className="space-y-1">
              <label
                htmlFor={field}
                className="text-sm font-medium text-gray-800 flex items-center space-x-1"
              >
                {field.replace(/([A-Z])/g, " $1")}
                <span className="text-red-500">*</span>
              </label>
              <select
                name={field}
                id={field}
                value={formData[field]}
                onChange={handleInputChange}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
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
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-semibold text-gray-800">Add Custom Data</h3>
            <div className="space-y-2">
              <input
                type="text"
                name="label"
                value={newCustomField.label}
                onChange={handleCustomFieldChange}
                placeholder="Label (e.g., 'Thyroid Status')"
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="value"
                value={newCustomField.value}
                onChange={handleCustomFieldChange}
                placeholder="Value (e.g., 'Normal')"
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={addCustomField}
                className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Add Field
              </button>
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

          {/* Submit & Close Buttons */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Close
            </button>
            <button
              type="submit"
              className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save & Proceed
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HealthDataModal;
