import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import FormSubmission from "./components/FormSubmission";
import Dashboard from "./components/Dashboard";

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


const Profile =() => {
  return <h1>Profile</h1>;
}


export default App;
