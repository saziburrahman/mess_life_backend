const Meal = require("../models/Meal");

exports.addMeal = async (req, res) => {
  try {
    const { messId, boarderId, date, breakfast, lunch, dinner } = req.body;
    const meal = await Meal.create({
      mess: messId,
      boarder: boarderId,
      date,
      breakfast,
      lunch,
      dinner,
    });
    res.status(201).json({ message: "Meal added successfully", meal });
  } catch (error) {
    res.status(500).json({ error: "Error adding meal" });
  }
};

exports.updateMeal = async (req, res) => {
  try {
    const { mealId } = req.params;
    const { breakfast, lunch, dinner } = req.body;
    const meal = await Meal.findByIdAndUpdate(
      mealId,
      { breakfast, lunch, dinner },
      { new: true }
    );
    res.status(200).json({ message: "Meal updated successfully", meal });
  } catch (error) {
    res.status(500).json({ error: "Error updating meal" });
  }
};
