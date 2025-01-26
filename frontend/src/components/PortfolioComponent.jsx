import React, { useState, useEffect } from "react";
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
  ComposedChart,
  Line,
} from "recharts";
import {
  Wallet,
  TrendingUp,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
} from "lucide-react";

const PortfolioComponent = () => {
  const [userData, setUserData] = useState(null);
  const [investments, setInvestments] = useState([]);
  const [totalInvested, setTotalInvested] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        // Fetch user profile
        const userResponse = await axios.get("http://localhost:5000/api/investments/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(userResponse.data);

        // Fetch investments
        const investmentsResponse = await axios.get("http://localhost:5000/api/investments", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const sortedInvestments = investmentsResponse.data.sort(
          (a, b) => b.total_investment - a.total_investment
        );
        setInvestments(sortedInvestments);

        const total = sortedInvestments.reduce(
          (sum, investment) => sum + investment.total_investment,
          0
        );
        setTotalInvested(total);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    };

    fetchPortfolioData();
  }, [token]);

  const calculateRiskAllocation = () => {
    const riskCategories = {
      "Low Risk": ["Fixed Deposit", "Bonds"],
      "Medium Risk": ["Mutual Fund"],
      "High Risk": ["Stock", "Real Estate"],
    };

    return investments.reduce((acc, investment) => {
      const riskLevel =
        Object.keys(riskCategories).find(risk =>
          riskCategories[risk].includes(investment.typeof_investment)
        ) || "Unclassified";

      acc[riskLevel] = (acc[riskLevel] || 0) + investment.total_investment;
      return acc;
    }, {});
  };

  const riskAllocationData = Object.entries(calculateRiskAllocation()).map(([name, value]) => ({
    name,
    value,
  }));

  const calculateTotalPotentialEarnings = () => {
    return investments.reduce((sum, investment) => {
      const principal = investment.total_investment;
      const rate = investment.rate_of_interest / 100;
      const time = investment.duration;
      return sum + (principal * Math.pow(1 + rate, time) - principal);
    }, 0);
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-blue-600 text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">{userData.user.name}'s Investment Portfolio</h2>
            <p className="text-blue-100">Your Financial Journey</p>
          </div>
          <div className="flex items-center space-x-4">
            <Wallet className="w-12 h-12 text-white" />
            <div>
              <p className="text-sm">Total Invested</p>
              <p className="text-2xl font-bold">₹{totalInvested.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Insights Grid */}
        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Risk Allocation Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <PieChartIcon className="mr-2 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-800">Risk Allocation</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskAllocationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {riskAllocationData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.name === "Low Risk"
                          ? "#82ca9d"
                          : entry.name === "Medium Risk"
                          ? "#ffc658"
                          : entry.name === "High Risk"
                          ? "#ff7f0e"
                          : "#8884d8"
                      }
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={value => [`₹${value.toLocaleString()}`, "Amount"]}
                  contentStyle={{ borderRadius: "10px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Investment Performance */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="mr-2 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-800">Investment Performance</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart
                data={investments.map((inv, index) => ({
                  name: inv.typeof_investment,
                  invested: inv.total_investment,
                  interest: inv.rate_of_interest,
                }))}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="invested" barSize={20} fill="#8884d8" />
                <Line type="monotone" dataKey="interest" stroke="#ff7300" />
              </ComposedChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                Potential Total Earnings:
                <span className="font-bold text-green-600 ml-2">
                  ₹{calculateTotalPotentialEarnings().toLocaleString()}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioComponent;
