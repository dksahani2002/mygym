const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const {
    name,
    email,
    password,
    age,
    gender,
    height,
    weight,
    goal,
    activity_level,
    body_fat_percent,
    experience_level,
    workout_preference,
    workout_days_per_week,
    time_per_session_minutes,
    equipment_available,
    injuries_or_limitations,
    sleep_hours_per_night,
    diet_quality
  } = req.body;

  console.log("Received Data:", req.body);

  try {
    // 1️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2️⃣ Validate required fields (adjust as needed)
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    // 3️⃣ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create new user object
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      age,
      gender,
      height,
      weight,
      goal,
      activity_level,
      body_fat_percent,
      experience_level,
      workout_preference,
      workout_days_per_week,
      time_per_session_minutes,
      equipment_available,
      injuries_or_limitations,
      sleep_hours_per_night,
      diet_quality
    });

    // 5️⃣ Validate and save the user
    await newUser.validate();
    const savedUser = await newUser.save();

    // 6️⃣ Generate token
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.status(201).json({ user: savedUser, token });
  } catch (error) {
    console.error("Error Registering User:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
