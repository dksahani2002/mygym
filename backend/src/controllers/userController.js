const User = require("../models/User");
const bcrypt = require("bcryptjs"); // Ensure this is imported
const generateToken = require("../utils/generateToken");

// Get User Profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update User Profile
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Basic info
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // Optional password update
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    // Fitness-related updates
    user.age = req.body.age ?? user.age;
    user.gender = req.body.gender ?? user.gender;
    user.height = req.body.height ?? user.height;
    user.weight = req.body.weight ?? user.weight;
    user.goal = req.body.goal ?? user.goal;
    user.activity_level = req.body.activity_level ?? user.activity_level;

    user.body_fat_percent = req.body.body_fat_percent ?? user.body_fat_percent;
    user.experience_level = req.body.experience_level ?? user.experience_level;
    user.workout_preference = req.body.workout_preference ?? user.workout_preference;
    user.workout_days_per_week = req.body.workout_days_per_week ?? user.workout_days_per_week;
    user.time_per_session_minutes = req.body.time_per_session_minutes ?? user.time_per_session_minutes;
    user.equipment_available = req.body.equipment_available ?? user.equipment_available;
    user.injuries_or_limitations = req.body.injuries_or_limitations ?? user.injuries_or_limitations;
    user.sleep_hours_per_night = req.body.sleep_hours_per_night ?? user.sleep_hours_per_night;
    user.diet_quality = req.body.diet_quality ?? user.diet_quality;

    const updatedUser = await user.save();

    // Optionally include new token if email or password changed
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
