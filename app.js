const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/userRoutes");
const messRoutes = require("./routes/messRoutes");
const mealRoutes = require("./routes/mealRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const errorHandler = require("./middlewares/errorHandler");

require("dotenv").config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/mess", messRoutes);
app.use("/api/meal", mealRoutes);
app.use("/api/expense", expenseRoutes);

app.use(errorHandler);

module.exports = app;
