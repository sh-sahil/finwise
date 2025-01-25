const mongoose = require("mongoose");

const formUserSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    ref: "User", // Name of the referenced model
    required: true, // Ensure the user_id is always provided
  },
  full_name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  employment_status: {
    type: String,
    required: true,
  },
  primary_financial_goal: {
    type: String,
    required: true,
  },
  goal_time_horizon: {
    type: String,
    required: true,
  },
  target_amount: {
    type: Number,
    required: true,
  },
  risk_tolerance: {
    type: String,
    required: true,
  },
  monthly_income: {
    type: Number,
    required: true,
  },
  monthly_expenses: {
    type: Number,
    required: true,
  },
  disposable_income: {
    type: Number,
    required: true,
  },
  preferred_investment_types: {
    type: [String], // Array of strings
    required: true,
  },
});

const FormUser = mongoose.model("FormUser", formUserSchema);

module.exports = FormUser;