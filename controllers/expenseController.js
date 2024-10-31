const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
  try {
    const { messId, amount, description, type } = req.body;
    const expense = await Expense.create({ mess: messId, amount, description, type, date: new Date() });
    res.status(201).json({ message: 'Expense added successfully', expense });
  } catch (error) {
    res.status(500).json({ error: 'Error adding expense' });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;
    const { amount, description, type } = req.body;
    const expense = await Expense.findByIdAndUpdate(expenseId, { amount, description, type }, { new: true });
    res.status(200).json({ message: 'Expense updated successfully', expense });
  } catch (error) {
    res.status(500).json({ error: 'Error updating expense' });
  }
};

exports.addBoarderDeposit = async (req, res) => {
  try {
    const { messId, boarderId } = req.params;
    const { amount, description } = req.body;
    const deposit = await Expense.create({
      mess: messId,
      boarder: boarderId,
      amount,
      description: description || 'Monthly Deposit',
      type: 'Monthly Contribution',
      date: new Date()
    });
    res.status(201).json({ message: 'Boarder deposit added successfully', deposit });
  } catch (error) {
    res.status(500).json({ error: 'Error adding boarder deposit' });
  }
};
