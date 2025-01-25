import  { useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  // State to track which box is clicked
  const [activeBox, setActiveBox] = useState(null);

  // Array of box data
  const boxes = [
    { id: 1, title: "Portfolio", component: <PortfolioComponent /> },
    { id: 2, title: "Goal", component: <GoalComponent /> },
    { id: 3, title: "Analysis", component: <AnalysisComponent /> },
    { id: 4, title: "Stocks", component: <StocksComponent /> },
    { id: 5, title: "FDs and RDs", component: <FdsRdsComponent /> },
    { id: 6, title: "Mutual Funds", component: <MutualFundsComponent /> },
    { id: 7, title: "Gold", component: <GoldComponent /> },
    { id: 8, title: "Property", component: <PropertyComponent /> },
    { id: 9, title: "Other Investments", component: <OtherInvestmentsComponent /> },
  ];

  // Handle box click
  const handleBoxClick = (id) => {
    setActiveBox(id);
  };

  return (
    <div className="dashboard">
      <h1>Personalized Dashboard</h1>

      {/* First Row: Portfolio, Goal, Analysis */}
      <div className="box-container">
        {boxes.slice(0, 3).map((box) => (
          <div
            key={box.id}
            className={`box ${activeBox === box.id ? "active" : ""}`}
            onClick={() => handleBoxClick(box.id)}
          >
            <h2>{box.title}</h2>
            <p>Click to open {box.title.toLowerCase()}</p>
          </div>
        ))}
      </div>

      {/* Title: Specialized Investing Modes */}
      <h2 className="section-title">Specialized Investing Modes</h2>

      {/* Second Row: Stocks, FDs and RDs, Mutual Funds */}
      <div className="box-container">
        {boxes.slice(3, 6).map((box) => (
          <div
            key={box.id}
            className={`box ${activeBox === box.id ? "active" : ""}`}
            onClick={() => handleBoxClick(box.id)}
          >
            <h2>{box.title}</h2>
            <p>Click to open {box.title.toLowerCase()}</p>
          </div>
        ))}
      </div>

      {/* Third Row: Gold, Property, Other Investments */}
      <div className="box-container">
        {boxes.slice(6).map((box) => (
          <div
            key={box.id}
            className={`box ${activeBox === box.id ? "active" : ""}`}
            onClick={() => handleBoxClick(box.id)}
          >
            <h2>{box.title}</h2>
            <p>Click to open {box.title.toLowerCase()}</p>
          </div>
        ))}
      </div>

      {/* Render the active component */}
      <div className="component-container">
        {activeBox && boxes.find((box) => box.id === activeBox).component}
      </div>
    </div>
  );
};

// Example components for each box
const PortfolioComponent = () => (
  <div className="component">
    <h3>Portfolio</h3>
    <p>View and manage your investment portfolio.</p>
  </div>
);

const GoalComponent = () => (
  <div className="component">
    <h3>Goal</h3>
    <p>Set and track your financial goals.</p>
  </div>
);

const AnalysisComponent = () => (
  <div className="component">
    <h3>Analysis</h3>
    <p>Analyze your investment performance.</p>
  </div>
);

const StocksComponent = () => (
  <div className="component">
    <h3>Stocks</h3>
    <p>Explore and manage your stock investments.</p>
  </div>
);

const FdsRdsComponent = () => (
  <div className="component">
    <h3>FDs and RDs</h3>
    <p>Manage your fixed deposits and recurring deposits.</p>
  </div>
);

const MutualFundsComponent = () => (
  <div className="component">
    <h3>Mutual Funds</h3>
    <p>Track and invest in mutual funds.</p>
  </div>
);

const GoldComponent = () => (
  <div className="component">
    <h3>Gold</h3>
    <p>Monitor your gold investments.</p>
  </div>
);

const PropertyComponent = () => (
  <div className="component">
    <h3>Property</h3>
    <p>Manage your real estate investments.</p>
  </div>
);

const OtherInvestmentsComponent = () => (
  <div className="component">
    <h3>Other Investments</h3>
    <p>Explore other investment opportunities.</p>
  </div>
);

export default Dashboard;