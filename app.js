const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const mealRoutes = require("./routes/mealRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

require("dotenv").config();

connectDB();

const app = express();
app.use(express.json());

// Define routes
app.use("/api/users", userRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/expenses", expenseRoutes);

module.exports = app;
