const Progress = require("../models/Progress");

// Log Progress
exports.logProgress = async (req, res) => {
  try {
    const { weight, bodyFat, muscleMass, notes } = req.body;
    const progress = await Progress.create({ user: req.user.id, weight, bodyFat, muscleMass, notes });
    res.status(201).json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Progress
exports.getProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.user.id });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Progress
exports.updateProgress = async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id);

    if (!progress) {
      return res.status(404).json({ message: "Progress entry not found" });
    }

    if (progress.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this entry" });
    }

    const updatedProgress = await Progress.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json(updatedProgress);
  } catch (error) {
    console.error("Error updating progress:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Progress
exports.deleteProgress = async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id);

    if (!progress) {
      return res.status(404).json({ message: "Progress entry not found" });
    }

    if (progress.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this entry" });
    }

    await progress.deleteOne();
    res.json({ message: "Progress entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting progress:", error);
    res.status(500).json({ message: "Server error" });
  }
};
