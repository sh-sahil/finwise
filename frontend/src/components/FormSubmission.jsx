import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Form = () => {
  // State to manage form inputs
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    age: 0,
    employment_status: "",
    primary_financial_goal: "",
    goal_time_horizon: "",
    target_amount: 0,
    risk_tolerance: "",
    monthly_income: 0,
    monthly_expenses: 0,
    disposable_income: 0,
    preferred_investment_types: [],
    socially_responsible_investments: "",
    portfolio_review_frequency: "",
    investment_concepts_familiarity: "",
    specific_preferences: "",
  });

  // Handle form input changes

  useEffect(() => {
    const checkFormSubmission = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token
        if (!token) {
          alert("You are not authenticated. Please log in.");
          navigate("/login"); // Redirect to login if no token
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/auth/is-form-submitted",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the header
            },
          }
        );

        if (response.data.isFormCompleted) {
          navigate("/dashboard"); // Redirect to dashboard if form is already submitted
        }
      } catch (error) {
        console.error("Error checking form submission status:", error);
        alert("An error occurred while checking form submission status.");
      }
    };

    checkFormSubmission();
  }, [navigate]);



  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
  
    setFormData((prev) => {
      let updatedTypes = [...prev.preferred_investment_types];
  
      if (checked) {
        // Add the value to the array if the checkbox is checked
        updatedTypes.push(value);
      } else {
        // Remove the value from the array if the checkbox is unchecked
        updatedTypes = updatedTypes.filter((type) => type !== value);
      }
  
      return {
        ...prev,
        [name]: updatedTypes, // Update the state with the new array
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = e.target.type === "number" ? parseFloat(value) || 0 : value;

    setFormData((prev) => {
      const newData = { ...prev, [name]: newValue };
      if (name === "monthly_income" || name === "monthly_expenses") {
        newData.disposable_income =
          parseFloat(newData.monthly_income || 0) -
          parseFloat(newData.monthly_expenses || 0);
      }
      return newData;
    });
  };

  // Handle multi-select changes
  const handleMultiSelectChange = (e) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter((option) => option.selected) // Filter selected options
      .map((option) => option.value); // Extract values
  
    setFormData({
      ...formData,
      [name]: selectedValues, // Update the state with selected values
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Get the token from local storage or wherever it's stored
    const token = localStorage.getItem("token"); // Replace with your token retrieval logic

    // Include the token in the request headers
    const response = await axios.post(
      "http://localhost:5000/api/form",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      }
    );

    console.log("Data saved successfully:", response.data);
    alert("Form submitted successfully!");
    useNavigate("/dashboard");
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Error submitting form. Please try again.");
  }
};

  return (
    <div className="form-container p-6 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-white">Financial Advisor Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <label className="block">
          <span className="block text-sm font-medium text-white">Full Name:</span>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white"
          />
        </label>

        {/* Age */}
        <label className="block">
          <span className="block text-sm font-medium text-white">Age:</span>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white"
          />
        </label>

        {/* Employment Status */}
        <label className="block">
          <span className="block text-sm font-medium text-white">Employment Status:</span>
          <select
            name="employment_status"
            value={formData.employment_status}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white"
          >
            <option value="">Select</option>
            <option value="Employed">Employed</option>
            <option value="Self-Employed">Self-Employed</option>
            <option value="Unemployed">Unemployed</option>
            <option value="Retired">Retired</option>
          </select>
        </label>

        {/* Primary Financial Goal */}
        <label className="block">
          <span className="block text-sm font-medium text-white">Primary Financial Goal:</span>
          <input
            type="text"
            name="primary_financial_goal"
            value={formData.primary_financial_goal}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white"
          />
        </label>

        {/* Goal Time Horizon */}
        <label className="block">
          <span className="block text-sm font-medium text-white">Goal Time Horizon:</span>
          <select
            name="goal_time_horizon"
            value={formData.goal_time_horizon}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white"
          >
            <option value="">Select</option>
            <option value="Short-Term">Short-Term (1-3 years)</option>
            <option value="Medium-Term">Medium-Term (3-5 years)</option>
            <option value="Long-Term">Long-Term (5+ years)</option>
          </select>
        </label>

        {/* Target Amount */}
        <label className="block">
          <span className="block text-sm font-medium text-white">Target Amount (₹):</span>
          <input
            type="number"
            name="target_amount"
            value={formData.target_amount}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white"
          />
        </label>

        {/* Risk Tolerance */}
        <label className="block">
          <span className="block text-sm font-medium text-white">Risk Tolerance:</span>
          <select
            name="risk_tolerance"
            value={formData.risk_tolerance}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white"
          >
            <option value="">Select</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>

        {/* Monthly Income */}
        <label className="block">
          <span className="block text-sm font-medium text-white">Monthly Income (₹):</span>
          <input
            type="number"
            name="monthly_income"
            value={formData.monthly_income}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white"
          />
        </label>

        {/* Monthly Expenses */}
        <label className="block">
          <span className="block text-sm font-medium text-white">Monthly Expenses (₹):</span>
          <input
            type="number"
            name="monthly_expenses"
            value={formData.monthly_expenses}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white"
          />
        </label>

            {/* Preferred Investment Types */}
            <label className="block">
            <span className="block text-sm font-medium text-white">
                Preferred Investment Types:
            </span>
            <div className="mt-2 space-y-2">
                {[
                "Stocks",
                "Bonds",
                "Mutual Funds",
                "Real Estate",
                "Cryptocurrency",
                ].map((type) => (
                <label key={type} className="flex items-center space-x-2">
                    <input
                    type="checkbox"
                    name="preferred_investment_types"
                    value={type}
                    checked={formData.preferred_investment_types.includes(type)}
                    onChange={handleCheckboxChange}
                    className="form-checkbox h-4 w-4 text-indigo-600 border-gray-600 rounded bg-gray-700"
                    />
                    <span className="text-white">{type}</span>
                </label>
                ))}
            </div>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded-md shadow-sm hover:bg-indigo-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
