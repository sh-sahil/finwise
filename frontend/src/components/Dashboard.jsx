import { useState } from "react";
import StocksComponent from "./StocksComponent";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [activeBox, setActiveBox] = useState(1); // Default to Portfolio (id: 1)

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

  const handleBoxClick = (id) => {
    setActiveBox(id);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Hamburger Button (Fixed Position) */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 p-2 text-gray-600 hover:bg-gray-100 rounded-lg z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`bg-white border-r border-gray-200 w-64 p-4 transition-all duration-300 fixed h-full ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <ul className="mt-10">
          {boxes.map((box) => (
            <li
              key={box.id}
              className={`p-3 cursor-pointer rounded-lg mb-2 ${
                activeBox === box.id
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => handleBoxClick(box.id)}
            >
              {box.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 p-6 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6 ml-11">Personalized Dashboard</h1>
        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
          {boxes.find((box) => box.id === activeBox).component}
        </div>
      </div>
    </div>
  );
};

// Components (unchanged)
const PortfolioComponent = () => (
  <div className="text-center">
    <h3 className="text-2xl font-semibold text-gray-700">Portfolio</h3>
    <p className="text-gray-500">View and manage your investment portfolio.</p>
  </div>
);

const GoalComponent = () => (
  <div className="text-center">
    <h3 className="text-2xl font-semibold text-gray-700">Goal</h3>
    <p className="text-gray-500">Set and track your financial goals.</p>
  </div>
);

const AnalysisComponent = () => (
  <div className="text-center">
    <h3 className="text-2xl font-semibold text-gray-700">Analysis</h3>
    <p className="text-gray-500">Analyze your investment performance.</p>
  </div>
);

const FdsRdsComponent = () => (
  <div className="text-center">
    <h3 className="text-2xl font-semibold text-gray-700">FDs and RDs</h3>
    <p className="text-gray-500">Manage your fixed deposits and recurring deposits.</p>
  </div>
);

const MutualFundsComponent = () => (
  <div className="text-center">
    <h3 className="text-2xl font-semibold text-gray-700">Mutual Funds</h3>
    <p className="text-gray-500">Track and invest in mutual funds.</p>
  </div>
);

const GoldComponent = () => (
  <div className="text-center">
    <h3 className="text-2xl font-semibold text-gray-700">Gold</h3>
    <p className="text-gray-500">Monitor your gold investments.</p>
  </div>
);

const PropertyComponent = () => (
  <div className="text-center">
    <h3 className="text-2xl font-semibold text-gray-700">Property</h3>
    <p className="text-gray-500">Manage your real estate investments.</p>
  </div>
);

const OtherInvestmentsComponent = () => (
  <div className="text-center">
    <h3 className="text-2xl font-semibold text-gray-700">Other Investments</h3>
    <p className="text-gray-500">Explore other investment opportunities.</p>
  </div>
);

export default Dashboard;