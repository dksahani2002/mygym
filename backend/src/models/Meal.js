const mongoose = require("mongoose");

const mealSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    foodItem: { type: String, required: true },
    calories: { type: Number, required: true },
    protein: { type: Number }, // in grams
    carbs: { type: Number }, // in grams
    fat: { type: Number }, // in grams
  },
  { timestamps: true }
);

module.exports = mongoose.model("Meal", mealSchema);
