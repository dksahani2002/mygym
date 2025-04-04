const mongoose = require("mongoose");

const workoutSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true }, // e.g., "Cardio", "Strength", "Yoga"
    duration: { type: Number, required: true }, // in minutes
    caloriesBurned: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);
