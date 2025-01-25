const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const FormUser = require("../models/Form"); // Updated model import
const User = require("../models/User");

const router = express.Router();

// Form Submission Route
router.post("/", protect, async (req, res) => {
  try {
    const userData = req.body;

    // Validate required fields
    const requiredFields = [
      "full_name",
      "age",
      "employment_status",
      "primary_financial_goal",
      "goal_time_horizon",
      "target_amount",
      "risk_tolerance",
      "monthly_income",
      "monthly_expenses",
      "disposable_income",
      "preferred_investment_types",
    ];

    for (const field of requiredFields) {
      if (!userData[field]) {
        return res
          .status(400)
          .json({ error: `The field "${field}" is required.` });
      }
    }

    // Check if user is authenticated
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized. User not found." });
    }

    // Save form data with user_id
    const formData = new FormUser({
      ...userData,
      user_id: req.user.id, // Associate form data with the logged-in user
    });
    await formData.save();

    // Update user's isFormCompleted status
    const user = await User.findById(req.user.id);
    if (user) {
      user.isFormCompleted = true;
      await user.save();
    }

    res.status(201).json({ message: "Form data saved successfully!" });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ error: "An error occurred while saving form data." });
  }
});

router.get("/get-target", protect, async (req, res) => {
  try {
    // Find form data for the authenticated user
    const forms = await FormUser.find({ user_id: req.user.id });

    // Check if any form data exists
    if (forms.length === 0) {
      return res.status(404).json({ error: "No form data found for this user." });
    }

    // Access the first form entry (assuming there's only one form per user)
    const form = forms[0];

    // Extract the required fields
    const target_amount = form.target_amount;
    const user_goal = form.primary_financial_goal;

    // Send the response
    res.json({ target_amount, user_goal });
  } catch (error) {
    console.error("Error fetching form data:", error);
    res.status(500).json({ error: "An error occurred while fetching form data." });
  }
});
module.exports = router;