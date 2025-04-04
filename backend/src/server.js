const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Import routes
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const workoutRoutes = require("./routes/workoutRoutes.js");
const mealRoutes = require("./routes/mealRoutes.js");
const progressRoutes = require("./routes/progressRoutes.js");

// Define Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/workout", workoutRoutes);
app.use("/api/meal", mealRoutes);
app.use("/api/progress", progressRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Fitness App API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
