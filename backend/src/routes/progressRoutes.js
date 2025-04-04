const express = require("express");
const { logProgress, getProgress, updateProgress, deleteProgress } = require("../controllers/progressController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/log", protect, logProgress);
router.get("/", protect, getProgress);
router.put("/:id", protect, updateProgress);
router.delete("/:id", protect, deleteProgress);

module.exports = router;
