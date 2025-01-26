const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  typeof_investment: {
    type: String,
    required: true,
  },
  total_investment: {
    type: Number,
    required: true,
  },
  rate_of_interest: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number, // Duration in years (or other units like months)
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Investment = mongoose.model("Investment", investmentSchema);

module.exports = Investment;
