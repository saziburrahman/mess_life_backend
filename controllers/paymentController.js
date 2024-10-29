const Payment = require("../models/Payment");
const asyncHandler = require("express-async-handler");

// Create a new payment
const createPayment = asyncHandler(async (req, res) => {
  const { userId, amount, paymentMethod, status } = req.body;

  if (!userId || !amount || !paymentMethod) {
    const validationError = new Error("Missing required fields");
    validationError.statusCode = 400;
    throw validationError;
  }

  const payment = new Payment({
    userId,
    amount,
    paymentMethod,
    status: status || "Pending",
  });

  await payment.save();
  res.status(201).json(payment);
});

// Get all payments
const getPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find().populate("userId", "name");

  if (!payments.length) {
    const noPaymentsError = new Error("No payments found");
    noPaymentsError.statusCode = 404;
    throw noPaymentsError;
  }

  res.json(payments);
});

module.exports = { createPayment, getPayments };
