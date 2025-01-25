import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignUp) {
        // Register user
        const { data } = await axios.post("http://localhost:5000/api/auth/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        alert("Registration successful!");
        navigate('/form'); // Navigate to form page after signup
      } else {
        // Login user
        const { data } = await axios.post("http://localhost:5000/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("token", data.token);
        navigate("/profile"); // Navigate to a profile or another page
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

        <form className="mt-4" onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 rounded focus:outline-none focus:ring"
                placeholder="Enter your name"
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 rounded focus:outline-none focus:ring"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 rounded focus:outline-none focus:ring"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-black rounded hover:bg-gray-800 focus:outline-none"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-500 hover:underline"
          >
            {isSignUp ? "Login here" : "Sign up here"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;