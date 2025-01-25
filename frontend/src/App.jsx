import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import FormSubmission from "./components/FormSubmission";

const App = () => {
  const user = localStorage.getItem("token");
  const [isLoginVisible, setIsLoginVisible] = useState(false);

  return (
    <BrowserRouter> {/* Wrap the whole app with BrowserRouter */}
      <div className={`min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-gray-900 ${isLoginVisible ? 'overflow-hidden' : ''}`}>
        <Routes>
          <Route path="/" element={<Navbar showLogin={() => setIsLoginVisible(true)} />} />
          <Route path="/login" element={<Login hideLogin={() => setIsLoginVisible(false)} />} />
          {user && <Route path="/dashboard" element={<Dashboard />} />}
          <Route path="/form" element={<FormSubmission />} />
        </Routes>

        {/* Overlay for Login modal */}
        {isLoginVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <Login hideLogin={() => setIsLoginVisible(false)} />
          </div>
        )}
      </div>
    </BrowserRouter>
  );
};

// Dashboard Component
const Dashboard = () => {
  const navigate = useNavigate();
  const isFormSubmitted = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/is-form-submitted", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.isFormCompleted;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error checking form submission status:", error);
      return false;
    }
  };

  const handleLogin = async () => {
    const formSubmitted = await isFormSubmitted();
    if (formSubmitted) {
      navigate("/dashboard");
      console.log(formSubmitted)
    } else {
      navigate("/form");  // Redirect to the form page if not completed
    }
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return <h1>Dashboard</h1>;
};


const Profile =() => {
  return <h1>Profile</h1>;
}


export default App;
