import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Form from "./components/Form";

const App = () => {
  const user = true; // Replace with your actual user state logic

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/login" element={<Login />} />

        {/* Conditional Routes */}
        {user && (
          <>
            <Route path="/dashboard" element={<h1>Dashboard</h1>} />
            <Route path="/form" element={<Form />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
