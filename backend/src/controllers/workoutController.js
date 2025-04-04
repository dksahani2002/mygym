const Workout = require("../models/Workout");

// Log Workout
exports.logWorkout = async (req, res) => {
  try {
    const { type, duration, caloriesBurned } = req.body;
    const workout = await Workout.create({ user: req.user.id, type, duration, caloriesBurned });
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User Workouts
exports.getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.id });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Workout
exports.updateWorkout = async (req, res) => {
  console.log("entry :");
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ message: "Workout not found" });

    workout.type = req.body.type || workout.type;
    workout.duration = req.body.duration || workout.duration;
    workout.caloriesBurned = req.body.caloriesBurned || workout.caloriesBurned;

    const updatedWorkout = await workout.save();
    res.json(updatedWorkout);
  } catch (error) {
    console.log("error:",error);
    res.status(500).json({ message: error.message });
  }
};

// Delete Workout
exports.deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    await workout.deleteOne(); // Replaces deprecated workout.remove()
    res.json({ message: "Workout deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

