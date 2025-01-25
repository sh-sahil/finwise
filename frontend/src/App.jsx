import React from "react";
import { BrowserRouter, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";

const App = () => {
  const user = localStorage.getItem("token"); 

  return (
   
      <div className="min-h-screen bg-gray-50">
        
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navbar />} />
          
          <Route path="/login" element={<Login />} />
        {
          user && (
            <Route path="/dashboard" element={<h1>Dashboard</h1>} />
          )
        }
          
          
          
          
        </Routes>
      </BrowserRouter>
      </div>
    
  );
};

export default App;
