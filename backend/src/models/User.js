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
    goal: {
      type: String,
      enum: ["Weight Loss", "Muscle Gain", "Strength Training", "Maintenance"],
    },
    activity_level: {
      type: String,
      enum: ["Low", "Moderate", "High", "Athlete"],
    },

    // ✅ Add these fields:
    body_fat_percent: { type: Number }, // Optional
    experience_level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    workout_preference: {
      type: String,
      enum: ["Full Body", "Upper Lower", "Push Pull Legs", "Bro Split", "Custom"],
    },
    workout_days_per_week: { type: Number }, // 1 to 7
    time_per_session_minutes: { type: Number }, // Optional
    equipment_available: [{ type: String }], // e.g. ["Dumbbells", "Barbell", "Pull-up Bar"]
    injuries_or_limitations: [{ type: String }],
    sleep_hours_per_night: { type: Number },
    diet_quality: {
      type: String,
      enum: ["Poor", "Average", "High Protein", "Keto", "Vegan", "Balanced"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

// const mongoose = require("mongoose");

// const userSchema = mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     age: { type: Number },
//     gender: { type: String, enum: ["Male", "Female", "Other"] },
//     height: { type: Number }, // in cm
//     weight: { type: Number }, // in kg
//     goal: { type: String, enum: ["Weight Loss", "Muscle Gain", "Strength Training", "Maintenance"] },
//     activity_level:{ type: String, enum: ["Low", "Moderate", "High", "Athlete"] },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);
