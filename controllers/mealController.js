const Meal = require("../models/Meal");
const asyncHandler = require("express-async-handler");

const createMeal = asyncHandler(async (req, res) => {
  try {
    const { date, menu, isSpecial } = req.body;
    const meal = new Meal({
      date,
      menu,
      isSpecial: isSpecial || false,
      createdBy: req.user.id,
    });
    await meal.save();
    res.status(201).json(meal);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

const getMeals = asyncHandler(async (req, res) => {
  try {
    const meals = await Meal.find().populate("createdBy", "name");
    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = { createMeal, getMeals };
