const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  mess: { type: mongoose.Schema.Types.ObjectId, ref: "Mess", required: true },
  description: { type: String },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  type: {
    type: String,
    enum: ["General", "Monthly Contribution", "Utility"],
    default: "General",
  },
  boarder: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
});

module.exports = mongoose.model("Expense", expenseSchema);
