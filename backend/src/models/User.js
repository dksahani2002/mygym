const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    height: { type: Number }, // in cm
    weight: { type: Number }, // in kg
    goal: { type: String, enum: ["Weight Loss", "Muscle Gain", "Strength Training", "Maintenance"] },
    activity_level:{ type: String, enum: ["Low", "Moderate", "High", "Athlete"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
