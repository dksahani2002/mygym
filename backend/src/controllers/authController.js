const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password, age, height_cm, weight_kg, goal, activity_level } = req.body;

  console.log("Received Data:", { name, email, password, age, height_cm, weight_kg, goal, activity_level });

  try {
    // 1️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    console.log("Existing User:", existingUser);

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2️⃣ Validate required fields
    if (!name || !email || !password || !age || !height_cm || !weight_kg || !goal || !activity_level) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 3️⃣ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);

    // 4️⃣ Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      age,
      height_cm,
      weight_kg,
      goal,
      activity_level
    });

    // 5️⃣ Validate user schema before saving
    await newUser.validate();  
    const savedUser = await newUser.save();
    console.log("Saved User:", savedUser);

    // 6️⃣ Generate JWT token
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ user: savedUser, token });

  } catch (error) {
    console.error("Error Registering User:", error); // Log error details
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
