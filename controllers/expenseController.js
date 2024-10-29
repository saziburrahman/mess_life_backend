const Expense = require("../models/Expense");
const asyncHandler = require("express-async-handler");

// Create a new expense
const createExpense = asyncHandler(async (req, res) => {
  const { description, amount, date } = req.body;

  if (!description || !amount) {
    const validationError = new Error("Description and amount are required");
    validationError.statusCode = 400;
    throw validationError;
  }

  const expense = new Expense({
    description,
    amount,
    date: date || new Date(),
    addedBy: req.user.id,
  });
  await expense.save();
  res.status(201).json(expense);
});

// Get all expenses
const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find().populate("addedBy", "name");

  if (!expenses.length) {
    const noExpensesError = new Error("No expenses found");
    noExpensesError.statusCode = 404;
    throw noExpensesError;
  }
  res.json(expenses);
});

module.exports = { createExpense, getExpenses };
