const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  mess: { type: mongoose.Schema.Types.ObjectId, ref: "Mess", required: true },
  boarder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: { type: Date, default: Date.now },
  month: { type: String, required: true },
  breakfast: { type: Number, default: 0 },
  lunch: { type: Number, default: 0 },
  dinner: { type: Number, default: 0 },
});

module.exports = mongoose.model("Meal", mealSchema);
