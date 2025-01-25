const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Root Endpoint
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error Handling
app.use((err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  res.status(statusCode).json({ message: err.message });
});

// ==================================================
// New Code for Form Submission (Without Changing Existing Code)
// ==================================================

// User Schema for Form Data
const formUserSchema = new mongoose.Schema({
  full_name: String,
  age: Number,
  employment_status: String,
  primary_financial_goal: String,
  goal_time_horizon: String,
  target_amount: Number,
  risk_tolerance: String,
  monthly_income: Number,
  monthly_expenses: Number,
  disposable_income: Number,
  preferred_investment_types: [String],
  socially_responsible_investments: String,
  portfolio_review_frequency: String,
  investment_concepts_familiarity: String,
  specific_preferences: String,
});

const FormUser = mongoose.model("FormUser", formUserSchema);

// Form Submission Route
app.post("/api/form/user", async (req, res) => {
  try {
    const userData = req.body;
    const newUser = new FormUser(userData);
    await newUser.save();
    res.status(201).json({ message: "Form data saved successfully!" });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ error: "Error saving form data." });
  }
});

// ==================================================
// End of New Code
// ==================================================

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));