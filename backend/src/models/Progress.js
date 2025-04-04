const mongoose = require("mongoose");

const progressSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    weight: { type: Number, required: true }, // in kg
    bodyFatPercentage: { type: Number }, // in %
    muscleMass: { type: Number }, // in kg
  },
  { timestamps: true }
);

module.exports = mongoose.model("Progress", progressSchema);
