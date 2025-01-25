import React from "react";
import Login from "./Login";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-black shadow-md ">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white">FinWise</h1>

        {/* Navigation Menu */}
        <nav className="flex items-center space-x-6">
          <button className="text-white font-medium hover:underline">Home</button>
          <button className="text-white font-medium hover:underline">About</button>
          <button className="text-white font-medium hover:underline">Services</button>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-white text-black-500 font-medium rounded-lg shadow hover:bg-black-100">
            <Link to='/login'>
            Login
            </Link>
          </button>
          <button className="px-4 py-2 bg-gray-700 text-white font-medium rounded-lg shadow hover:bg-black-600">
            <Link to='/login' state={{ isSignup: true }}>
            Sign Up
            </Link>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
