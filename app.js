const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const mealRoutes = require("./routes/mealRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const costRoutes = require("./routes/costRoutes");
const errorHandler = require("./middleware/errorMiddleware");

require("dotenv").config();

connectDB();

const app = express();
app.use(express.json());

// Define routes
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/users", userRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/costs", costRoutes);

// Use error handler
app.use(errorHandler);

module.exports = app;
