const Meal = require("../models/Meal");

// Log Meal
exports.logMeal = async (req, res) => {
  try {
    const { foodItem, calories, protein, carbs, fat } = req.body;
    const meal = await Meal.create({ user: req.user.id, foodItem, calories, protein, carbs, fat });
    res.status(201).json(meal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Meals
exports.getMeals = async (req, res) => {
  try {
    const meals = await Meal.find({ user: req.user.id });
    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Meal
exports.updateMeal = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);

    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    // Ensure the user owns the meal
    if (meal.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this meal" });
    }

    // Update meal fields
    const updatedMeal = await Meal.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json(updatedMeal);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);

    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    // Ensure the user owns the meal
    if (meal.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this meal" });
    }

    await meal.deleteOne(); // Delete the meal
    res.json({ message: "Meal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};