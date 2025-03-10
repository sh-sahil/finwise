import { useState, useEffect } from "react";
import StocksComponent from "./StocksComponent";
// import GoldComponent from "./GoldComponent";
import ChatWindow from "./ChatWindow"; // Import the ChatWindow component
import { GoalComponent } from "./GoalComponent";
import Groq from "groq-sdk";
import { GROQ_API } from "./config";
import OtherInvestmentsComponent from "./OtherInvestmentsComponent";
import FdsRdsComponent from "./FdsRdsComponent";
import PropertyComponent from "./PropertyComponent";
import PortfolioComponent from "./PortfolioComponent";
import RecomSystem from "./RecomSystem";
import { useNavigate } from "react-router-dom";

const groq = new Groq({ apiKey: GROQ_API, dangerouslyAllowBrowser: true });

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeBox, setActiveBox] = useState(1); // Default to Portfolio (id: 1)
  const [showChat, setShowChat] = useState(false);
  const [response, setResponse] = useState(""); // State to hold the AI response
  const [prompt, setPrompt] = useState(""); // Prompt input for the chat4
  const naviagte = useNavigate();

  const boxes = [
    { id: 1, title: "Portfolio", component: <PortfolioComponent /> },
    { id: 2, title: "Recommendation", component: <RecomSystem /> },
    { id: 3, title: "Goal", component: <GoalComponent /> },
    { id: 5, title: "Stocks", component: <StocksComponent /> },
    { id: 6, title: "FDs and RDs", component: <FdsRdsComponent /> },
    { id: 7, title: "Gold", component: <GoldComponent /> },
    { id: 8, title: "Property", component: <PropertyComponent /> },
    { id: 9, title: "Other Investments", component: <OtherInvestmentsComponent /> },
  ];

  const handleBoxClick = id => {
    setActiveBox(id);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSendPrompt = async prompt => {
    try {
      if (prompt.trim()) {
        const chatCompletion = await groq.chat.completions.create({
          messages: [{ role: "user", content: prompt }],
          model: "llama-3.3-70b-versatile",
        });
        const aiResponse = chatCompletion.choices[0]?.message?.content || "";
        setResponse(aiResponse); // Set the AI response in the state
        setPrompt(""); // Clear the prompt input after sending
      }
    } catch (error) {
      console.error("Error sending prompt to Groq AI:", error);
    }
  };

  const handleSignOut = () => {
    // Logic to sign out the user, e.g., clearing tokens, redirecting, etc.
    localStorage.removeItem("token");
    console.log("User signed out");
    navigate("/ ");
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
          {boxes.map(box => (
            <li
              key={box.id}
              className={`p-3 cursor-pointer rounded-lg mb-2 list-none ${
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
        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="mt-[220px] w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
        >
          Sign Out
        </button>
      </div>

      {/* Main Content */}
      <div className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <h1 className="text-3xl font-bold text-gray-800 mb-6 ml-11">Personalized Dashboard</h1>
        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
          {boxes.find(box => box.id === activeBox).component}
        </div>
      </div>

      {/* Chat Icon and Chat Window */}
      <ChatIcon onClick={() => setShowChat(true)} />
      {showChat && (
        <ChatWindow
          onClose={() => setShowChat(false)}
          onSend={handleSendPrompt}
          response={response}
          prompt={prompt}
          setPrompt={setPrompt}
        />
      )}
    </div>
  );
};

const ChatIcon = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="fixed bottom-4 right-4 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-blue-600"
    >
      💬
    </div>
  );
};

const GoldComponent = () => {
  return <div>this is dashboard</div>;
};

export default Dashboard;
