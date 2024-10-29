const Expense = require("../models/Expense");
const asyncHandler = require("express-async-handler");

const createExpense = asyncHandler(async (req, res) => {
  try {
    const { description, amount, date } = req.body;
    const expense = new Expense({
      description,
      amount,
      date: date || new Date(),
      addedBy: req.user.id,
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

const getExpenses = asyncHandler(async (req, res) => {
  try {
    const expenses = await Expense.find().populate("addedBy", "name");
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = { createExpense, getExpenses };
