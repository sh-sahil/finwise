import { useState, useEffect } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export const GoalComponent = () => {
  const [goalData, setGoalData] = useState(null);
  const [investments, setInvestments] = useState([]);
  const [totalInvested, setTotalInvested] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [userName, setUserName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newInvestment, setNewInvestment] = useState({
    typeof_investment: "",
    total_investment: "",
    rate_of_interest: "",
    duration: "",
  });

  // Retrieve the token from local storage
  const token = localStorage.getItem("token");

  // Fetch goal and target amount from the backend
  useEffect(() => {
    const fetchGoalData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/form/get-target", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGoalData(response.data);
        setRemainingAmount(response.data.target_amount);
      } catch (error) {
        console.error("Error fetching goal data:", error);
      }
    };

    const fetchInvestments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/investments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInvestments(response.data);

        const total = response.data.reduce(
          (sum, investment) => sum + investment.total_investment,
          0
        );
        setTotalInvested(total);
        setRemainingAmount(goalData?.target_amount - total);
      } catch (error) {
        console.error("Error fetching investment data:", error);
      }
    };

    fetchGoalData();
    fetchInvestments();
  }, [goalData?.target_amount, token]);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/investments/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserName(response.data.user.name);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserName();
  }, [token]);

  const handleAddInvestment = async e => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/investments", newInvestment, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Refresh investments
      const updatedInvestments = await axios.get("http://localhost:5000/api/investments", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setInvestments(updatedInvestments.data);

      // Calculate new totals
      const total = updatedInvestments.data.reduce(
        (sum, investment) => sum + investment.total_investment,
        0
      );
      setTotalInvested(total);
      setRemainingAmount(goalData.target_amount - total);

      // Close modal and reset form
      setIsModalOpen(false);
      setNewInvestment({
        typeof_investment: "",
        total_investment: "",
        rate_of_interest: "",
        duration: "",
      });
    } catch (error) {
      console.error("Error adding investment:", error);
    }
  };

  // Delete investment
  const handleDeleteInvestment = async investmentId => {
    try {
      await axios.delete(`http://localhost:5000/api/investments/${investmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Refresh investments after deletion
      const response = await axios.get("http://localhost:5000/api/investments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInvestments(response.data);

      // Recalculate total invested and remaining amount
      const total = response.data.reduce((sum, investment) => sum + investment.total_investment, 0);
      setTotalInvested(total);
      setRemainingAmount(goalData?.target_amount - total);
    } catch (error) {
      console.error("Error deleting investment:", error);
    }
  };

  // Calculate potential earnings
  const calculatePotentialEarnings = investment => {
    const principal = investment.total_investment;
    const rate = investment.rate_of_interest / 100;
    const time = investment.duration;
    return principal * Math.pow(1 + rate, time) - principal;
  };

  // Calculate the current value of each investment
  const calculateInvestmentProgress = investment => {
    const today = new Date();
    const startDate = new Date(investment.created_at);
    const durationInMs = investment.duration * 365 * 24 * 60 * 60 * 1000; // Assuming duration is in years
    const timeElapsed = today - startDate;
    const progress = (timeElapsed / durationInMs) * 100; // Percentage of the investment duration completed

    return (investment.total_investment * progress) / 100; // Current value of the investment
  };

  // Calculate the total progress toward the goal
  const calculateGoalProgress = () => {
    return (totalInvested / goalData?.target_amount) * 100;
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* User and Goal Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Welcome, {userName}</h2>
        <h3 className="text-2xl font-bold text-gray-700">Goal: {goalData?.user_goal}</h3>
        <div className="flex justify-center gap-4 mt-2">
          <p className="font-semibold">
            Target Amount: ₹{goalData?.target_amount?.toLocaleString()}
          </p>
          <p className="font-semibold">Total Invested: ₹{totalInvested.toLocaleString()}</p>
          <p className="font-semibold">Remaining: ₹{remainingAmount.toLocaleString()}</p>
        </div>

        {/* Add Investments Button - Always Visible */}
        <div className="mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsModalOpen(true)}
          >
            Add Investments
          </button>
        </div>
      </div>

      {investments.length === 0 ? (
        <div className="text-center mt-4">
          <p className="mb-4 text-gray-600">You haven't made any investments yet.</p>
        </div>
      ) : (
        // If investments are made, show investment details and charts
        <div className="grid grid-cols-2 gap-6">
          {/* Investment Details */}
          {investments.map(investment => (
            <div key={investment._id} className="bg-green-50 p-4 rounded-lg relative">
              <button
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                onClick={() => handleDeleteInvestment(investment._id)}
              >
                ✕
              </button>
              <h4 className="font-bold text-lg mb-4">{investment.typeof_investment} Investment</h4>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="font-medium">Amount Invested:</td>
                    <td>₹{investment.total_investment.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Rate of Interest:</td>
                    <td>{investment.rate_of_interest}%</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Duration:</td>
                    <td>{investment.duration} years</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Current Value:</td>
                    <td>₹{calculateInvestmentProgress(investment).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Potential Earnings:</td>
                    <td>₹{calculatePotentialEarnings(investment).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}

          {/* Goal Progress */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-bold text-lg mb-4">Goal Progress</h4>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Achieved", value: calculateGoalProgress() },
                    { name: "Remaining", value: 100 - calculateGoalProgress() },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell key="achieved" fill="#82ca9d" />
                  <Cell key="remaining" fill="#ff7f0e" />
                </Pie>
                <Tooltip formatter={value => [`${value.toFixed(2)}%`]} />
              </PieChart>
            </ResponsiveContainer>
            <p className="text-center">Goal Progress: {calculateGoalProgress().toFixed(2)}%</p>
          </div>

          {/* Asset Allocation */}
          <div className="col-span-2 bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold text-lg mb-4">Asset Allocation</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={investments}>
                <XAxis dataKey="typeof_investment" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total_investment" fill="#8884d8" name="Total Investment" />
                <Bar dataKey="rate_of_interest" fill="#82ca9d" name="Rate of Interest" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Investment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Add New Investment</h2>
            <form onSubmit={handleAddInvestment}>
              <div className="mb-4">
                <label className="block mb-2">Investment Type</label>
                <select
                  value={newInvestment.typeof_investment}
                  onChange={e =>
                    setNewInvestment({ ...newInvestment, typeof_investment: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select Investment Type</option>
                  <option value="Mutual Fund">Mutual Fund</option>
                  <option value="Fixed Deposit">Fixed Deposit</option>
                  <option value="Stock">Stock</option>
                  <option value="Bonds">Bonds</option>
                  <option value="Real Estate">Real Estate</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Total Investment Amount</label>
                <input
                  type="number"
                  value={newInvestment.total_investment}
                  onChange={e =>
                    setNewInvestment({ ...newInvestment, total_investment: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  placeholder="Enter investment amount"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Rate of Interest (%)</label>
                <input
                  type="number"
                  value={newInvestment.rate_of_interest}
                  onChange={e =>
                    setNewInvestment({ ...newInvestment, rate_of_interest: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  placeholder="Enter interest rate"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Investment Duration (Years)</label>
                <input
                  type="number"
                  value={newInvestment.duration}
                  onChange={e => setNewInvestment({ ...newInvestment, duration: e.target.value })}
                  className="w-full p-2 border rounded"
                  placeholder="Enter investment duration"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                  Add Investment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
