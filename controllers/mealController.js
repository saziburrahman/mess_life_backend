const Meal = require("../models/Meal");
const asyncHandler = require("express-async-handler");

// Create a new meal
const createMeal = asyncHandler(async (req, res) => {
  const { date, menu, isSpecial } = req.body;

  if (!date || !menu) {
    const validationError = new Error("Date and menu are required");
    validationError.statusCode = 400;
    throw validationError;
  }

  const meal = new Meal({
    date,
    menu,
    isSpecial: isSpecial || false,
    createdBy: req.user.id,
  });
  await meal.save();
  res.status(201).json(meal);
});

// Get all meals
const getMeals = asyncHandler(async (req, res) => {
  const meals = await Meal.find().populate("createdBy", "name");

  if (!meals.length) {
    const noMealsError = new Error("No meals found");
    noMealsError.statusCode = 404;
    throw noMealsError;
  }

  res.json(meals);
});

module.exports = { createMeal, getMeals };
