const express = require("express");
const { logMeal, getMeals, updateMeal, deleteMeal } = require("../controllers/mealController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/log", protect, logMeal);
router.get("/", protect, getMeals);
router.put("/:id", protect, updateMeal);
router.delete("/:id", protect, deleteMeal);

module.exports = router;
