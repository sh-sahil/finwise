import { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export const GoalComponent = () => {
  const [goalData, setGoalData] = useState(null);
  const [investments, setInvestments] = useState([]);
  const [totalInvested, setTotalInvested] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);

  // Retrieve the token from local storage
  const token = localStorage.getItem('token'); // or sessionStorage.getItem('token')

  // Fetch goal and target amount from the backend
  useEffect(() => {
    const fetchGoalData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/form/get-target', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGoalData(response.data);
        setRemainingAmount(response.data.target_amount);
      } catch (error) {
        console.error('Error fetching goal data:', error);
      }
    };

    const fetchInvestments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/investments', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInvestments(response.data);

        // Calculate total amount invested
        const total = response.data.reduce((sum, investment) => sum + investment.total_investment, 0);
        setTotalInvested(total);
        setRemainingAmount(goalData?.target_amount - total);
      } catch (error) {
        console.error('Error fetching investment data:', error);
      }
    };

    fetchGoalData();
    fetchInvestments();
  }, [goalData?.target_amount, token]);

  // Calculate the current value of each investment
  const calculateInvestmentProgress = (investment) => {
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
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-700">Financial Goal Tracker</h3>
        <p className="text-gray-500">Track your progress towards your financial objectives</p>
      </div>

      {investments.length === 0 ? (
        // If no investments are made, show goal details
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-4">Goal Details</h4>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="font-medium">Goal:</td>
                <td>{goalData?.user_goal}</td>
              </tr>
              <tr>
                <td className="font-medium">Target Amount:</td>
                <td>₹{goalData?.target_amount?.toLocaleString()}</td>
              </tr>
              <tr>
                <td className="font-medium">Amount Remaining:</td>
                <td>₹{remainingAmount.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        // If investments are made, show investment details and charts
        <>
          <div className="grid grid-cols-2 gap-6">
            {/* Display Investment Details */}
            {investments.map((investment) => (
              <div key={investment._id} className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-4">Investment Details</h4>
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
                  </tbody>
                </table>
              </div>
            ))}

            {/* Display Goal Progress */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-lg mb-4">Goal Progress</h4>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Achieved', value: calculateGoalProgress() },
                      { name: 'Remaining', value: 100 - calculateGoalProgress() },
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
                  <Tooltip formatter={(value) => [`${value.toFixed(2)}%`]} />
                </PieChart>
              </ResponsiveContainer>
              <p className="text-center">Goal Progress: {calculateGoalProgress().toFixed(2)}%</p>
            </div>

            {/* Display Asset Allocation */}
            <div className="col-span-2 bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold text-lg mb-4">Asset Allocation</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={investments}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total_investment" fill="#8884d8" name="Total Investment" />
                  <Bar dataKey="rate_of_interest" fill="#82ca9d" name="Rate of Interest" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};