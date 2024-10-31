const Mess = require("../models/Mess");
const User = require("../models/User");
const Expense = require("../models/Expense");
const Meal = require("../models/Meal");

exports.createMess = async (req, res) => {
  try {
    const { name, managerId } = req.body;
    const mess = await Mess.create({
      name,
      manager: managerId,
      boarders: [managerId],
    });
    await User.findByIdAndUpdate(managerId, { mess: mess._id });
    res.status(201).json({ message: "Mess created successfully", mess });
  } catch (error) {
    res.status(500).json({ error: "Error creating mess" });
  }
};

exports.joinMess = async (req, res) => {
  try {
    const { userId, messId } = req.body;
    const mess = await Mess.findByIdAndUpdate(messId, {
      $addToSet: { boarders: userId },
    });
    await User.findByIdAndUpdate(userId, { mess: mess._id });
    res.status(200).json({ message: "Joined mess successfully", mess });
  } catch (error) {
    res.status(500).json({ error: "Error joining mess" });
  }
};

exports.calculateMonthlyCosts = async (req, res) => {
  try {
    const { messId, month } = req.params;
    // Monthly calculation logic here
    res.status(200).json({
      /* monthly calculation results */
    });
  } catch (error) {
    res.status(500).json({ error: "Error calculating monthly costs" });
  }
};

exports.getIndividualCostAndDeposit = async (req, res) => {
  try {
    const { userId } = req.params;
    const { month } = req.query;
    // Individual cost and deposit logic here
    res.status(200).json({
      /* individual calculation results */
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error retrieving individual cost and deposit" });
  }
};
