const express = require("express");
const { protect } = require("../middleware/authMiddleware"); // Authentication middleware
const Investment = require("../models/Investment"); // Investment model

const router = express.Router();

// Add a new investment for the user
router.post("/", protect, async (req, res) => {
  try {
    const { total_investment, rate_of_interest, duration, typeof_investment } = req.body;

    if (!total_investment || !rate_of_interest || !duration) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Create a new investment entry
    const newInvestment = new Investment({
      user_id: req.user.id, // The logged-in user's ID
      typeof_investment,
      total_investment,
      rate_of_interest,
      duration,
    });

    // Save the investment to the database
    await newInvestment.save();
    res.status(201).json({ message: "Investment data saved successfully!", data: newInvestment });
  } catch (error) {
    console.error("Error saving investment data:", error);
    res.status(500).json({ error: "An error occurred while saving investment data." });
  }
});

// Fetch all investments of the user
router.get("/", protect, async (req, res) => {
  try {
    const investments = await Investment.find({ user_id: req.user.id });

    if (!investments || investments.length === 0) {
      return res.status(404).json({ error: "No investment data found." });
    }

    res.json(investments);
  } catch (error) {
    console.error("Error fetching investments:", error);
    res.status(500).json({ error: "An error occurred while fetching investment data." });
  }
});

// Update an existing investment
router.patch("/:id", protect, async (req, res) => {
  try {
    const { total_investment, rate_of_interest, duration } = req.body;

    if (!total_investment && !rate_of_interest && !duration) {
      return res.status(400).json({ error: "At least one field is required to update." });
    }

    // Find the investment by ID and update
    const updatedInvestment = await Investment.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.id }, // Ensure the user can only update their own investments
      { 
        total_investment, 
        rate_of_interest, 
        duration, 
        updated_at: Date.now(), // Update the timestamp
      },
      { new: true } // Return the updated document
    );

    if (!updatedInvestment) {
      return res.status(404).json({ error: "Investment not found or unauthorized." });
    }

    res.json({ message: "Investment updated successfully.", data: updatedInvestment });
  } catch (error) {
    console.error("Error updating investment:", error);
    res.status(500).json({ error: "An error occurred while updating investment data." });
  }
});

module.exports = router;
