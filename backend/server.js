const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db");
const authRoutes = require("./routes/authRoutes");
const formRoutes = require("./routes/form");
const investmentRoutes = require("./routes/investmentRoutes");


dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/form", formRoutes);
app.use("/api/investments", investmentRoutes);

// Root Endpoint
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error Handling
app.use((err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  res.status(statusCode).json({ message: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
