const mongoose = require("mongoose");

const messSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  boarders: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  monthlyCost: { type: Number, default: 0 },
});

module.exports = mongoose.model("Mess", messSchema);
