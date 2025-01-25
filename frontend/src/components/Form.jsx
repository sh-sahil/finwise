import { useState } from "react";
import axios from "axios";

const Form = () => {
  // State to manage form inputs
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = e.target.type === 'number' ? parseFloat(value) || 0 : value;
    
    setFormData(prev => {
      const newData = { ...prev, [name]: newValue };
      if (name === 'monthly_income' || name === 'monthly_expenses') {
        newData.disposable_income = parseFloat(newData.monthly_income || 0) - parseFloat(newData.monthly_expenses || 0);
      }
      return newData;
    });
  };

  // Handle multi-select changes
  const handleMultiSelectChange = (e) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setFormData({
      ...formData,
      [name]: selectedValues,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/form/user", formData);
      console.log("Data saved successfully:", response.data);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      console.error("Error response:", error.response); // Log the full error response
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <div className="form-container p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Financial Advisor Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <label className="block">
          <span className="block text-sm font-medium">Full Name:</span>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
          />
        </label>

        {/* Age */}
        <label className="block">
          <span className="block text-sm font-medium">Age:</span>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
          />
        </label>

        {/* Employment Status */}
        <label className="block">
          <span className="block text-sm font-medium">Employment Status:</span>
          <select
            name="employment_status"
            value={formData.employment_status}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
          >
            <option value="">Select</option>
            <option value="Employed">Employed</option>
            <option value="Self-employed">Self-employed</option>
            <option value="Student">Student</option>
            <option value="Retired">Retired</option>
            <option value="Unemployed">Unemployed</option>
          </select>
        </label>

        {/* Primary Financial Goal */}
        <label className="block">
          <span className="block text-sm font-medium">Primary Financial Goal:</span>
          <select
            name="primary_financial_goal"
            value={formData.primary_financial_goal}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
          >
            <option value="">Select</option>
            <option value="Retirement Planning">Retirement Planning</option>
            <option value="Buying a Home">Buying a Home</option>
            <option value="Saving for Education">Saving for Education</option>
            <option value="Building Wealth">Building Wealth</option>
            <option value="Short-term Savings">Short-term Savings</option>
            <option value="Other">Other</option>
          </select>
        </label>

        {/* Goal Time Horizon */}
        <label className="block">
          <span className="block text-sm font-medium">Goal Time Horizon:</span>
          <select
            name="goal_time_horizon"
            value={formData.goal_time_horizon}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
          >
            <option value="">Select</option>
            <option value="Short-term (1-3 years)">Short-term (1-3 years)</option>
            <option value="Medium-term (3-10 years)">Medium-term (3-10 years)</option>
            <option value="Long-term (10+ years)">Long-term (10+ years)</option>
          </select>
        </label>

        {/* Target Amount */}
        <label className="block">
          <span className="block text-sm font-medium">Target Amount (₹):</span>
          <input
            type="number"
            name="target_amount"
            value={formData.target_amount}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
          />
        </label>

        {/* Risk Tolerance */}
        <label className="block">
          <span className="block text-sm font-medium">Risk Tolerance:</span>
          <select
            name="risk_tolerance"
            value={formData.risk_tolerance}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
          >
            <option value="">Select</option>
            <option value="Low (minimal risk, low returns)">Low (minimal risk, low returns)</option>
            <option value="Medium (balanced risk and returns)">Medium (balanced risk and returns)</option>
            <option value="High (high risk, high returns)">High (high risk, high returns)</option>
          </select>
        </label>

        {/* Monthly Income */}
        <label className="block">
          <span className="block text-sm font-medium">Monthly Income (₹):</span>
          <input
            type="number"
            name="monthly_income"
            value={formData.monthly_income}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
          />
        </label>

        {/* Monthly Expenses */}
        <label className="block">
          <span className="block text-sm font-medium">Monthly Expenses (₹):</span>
          <input
            type="number"
            name="monthly_expenses"
            value={formData.monthly_expenses}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
          />
        </label>

        {/* Disposable Income (auto-calculated) */}
        <label className="block">
          <span className="block text-sm font-medium">Disposable Income (₹):</span>
          <input
            type="number"
            name="disposable_income"
            value={formData.disposable_income}
            readOnly
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-200"
          />
        </label>

        {/* Preferred Investment Types */}
        <label className="block">
          <span className="block text-sm font-medium">Preferred Investment Types:</span>
          <select
            name="preferred_investment_types"
            multiple
            value={formData.preferred_investment_types}
            onChange={handleMultiSelectChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
          >
            <option value="Fixed Deposits (FDs)">Fixed Deposits (FDs)</option>
            <option value="Recurring Deposits (RDs)">Recurring Deposits (RDs)</option>
            <option value="Government Bonds">Government Bonds</option>
            <option value="Debt Mutual Funds">Debt Mutual Funds</option>
            <option value="Equity Mutual Funds">Equity Mutual Funds</option>
            <option value="Hybrid Mutual Funds">Hybrid Mutual Funds</option>
            <option value="ETFs">ETFs</option>
            <option value="Corporate Bonds">Corporate Bonds</option>
            <option value="Stocks">Stocks</option>
            <option value="Cryptocurrency">Cryptocurrency</option>
            <option value="Real Estate">Real Estate</option>
            <option value="High-Growth Mutual Funds">High-Growth Mutual Funds</option>
            <option value="Gold">Gold</option>
            <option value="Land">Land</option>
          </select>
        </label>

        {/* Socially Responsible Investments */}
        <label className="block">
          <span className="block text-sm font-medium">Focus on socially responsible investments:</span>
          <select
            name="socially_responsible_investments"
            value={formData.socially_responsible_investments}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        {/* Portfolio Review Frequency */}
        <label className="block">
          <span className="block text-sm font-medium">Portfolio Review Frequency:</span>
          <select
            name="portfolio_review_frequency"
            value={formData.portfolio_review_frequency}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
          >
            <option value="">Select</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Annually">Annually</option>
          </select>
        </label>

        {/* Familiarity with Investment Concepts */}
        <label className="block">
          <span className="block text-sm font-medium">Familiarity with basic investment concepts:</span>
          <select
            name="investment_concepts_familiarity"
            value={formData.investment_concepts_familiarity}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Somewhat">Somewhat</option>
          </select>
        </label>

        {/* Specific Preferences */}
        <label className="block">
          <span className="block text-sm font-medium">Specific investment preferences or constraints:</span>
          <input
            type="text"
            name="specific_preferences"
            value={formData.specific_preferences}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
          />
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

