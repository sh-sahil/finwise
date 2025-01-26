import React, { useEffect, useState } from "react";
import axios from "axios";

const RecomSystem = () => {
  const [userData, setUserData] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUserDataAndGenerateRecommendations();
  }, []);

  const fetchUserDataAndGenerateRecommendations = async () => {
    setIsLoading(true);
    try {
      // Fetch user data from the backend
      const response = await axios.get("http://localhost:5000/api/form/data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = response.data;
      setUserData(userData);

      // Generate recommendations based on user data
      const recommendations = generateRecommendations(userData);
      setRecommendations(recommendations);
    } catch (err) {
      setError("Failed to generate recommendations. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to generate recommendations based on user data
  const generateRecommendations = userData => {
    const {
      age,
      monthly_income,
      risk_tolerance,
      preferred_investment_types,
      primary_financial_goal,
    } = userData;

    // Define risk levels and corresponding investment strategies
    const riskLevels = {
      Low: {
        allocation: {
          Bonds: "60%",
          Stocks: "20%",
          Mutual_Funds: "10%",
          Real_Estate: "10%",
        },
        tips: [
          "Focus on low-risk investments to preserve capital.",
          "Consider government bonds for stable returns.",
        ],
      },
      Medium: {
        allocation: {
          Bonds: "40%",
          Stocks: "40%",
          Mutual_Funds: "10%",
          Real_Estate: "10%",
        },
        tips: [
          "Diversify your portfolio to balance risk and return.",
          "Consider index funds for steady growth.",
        ],
      },
      High: {
        allocation: {
          Bonds: "20%",
          Stocks: "60%",
          Mutual_Funds: "10%",
          Real_Estate: "10%",
        },
        tips: [
          "Invest in high-growth stocks for potential high returns.",
          "Consider real estate for long-term appreciation.",
        ],
      },
    };

    // Determine risk level based on user's risk tolerance
    const riskLevel =
      risk_tolerance === "Low" ? "Low" : risk_tolerance === "Medium" ? "Medium" : "High";

    // Generate recommendations based on risk level
    const { allocation, tips } = riskLevels[riskLevel];

    const recommendations = {
      risk_level: riskLevel,
      recommendations: Object.keys(allocation).map(type => ({
        type,
        allocation: allocation[type],
        description: `Allocate ${allocation[type]} of your portfolio to ${type}.`,
      })),
      tips,
    };

    return recommendations;
  };

  // Function to generate a PDF report (optional)

  if (isLoading) return <div>Loading recommendations...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Investment Recommendations</h1>
      {recommendations && (
        <div>
          <h2>Risk Level: {recommendations.risk_level}</h2>
          <ul>
            {recommendations.recommendations.map((rec, index) => (
              <li key={index}>
                <strong>{rec.type}:</strong> {rec.allocation} - {rec.description}
              </li>
            ))}
          </ul>
          <h3>Financial Tips:</h3>
          <ul>
            {recommendations.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RecomSystem;
