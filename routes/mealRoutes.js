const express = require("express");
const { addMeal, updateMeal } = require("../controllers/mealController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, addMeal);
router.put("/update/:mealId", authMiddleware, updateMeal);

module.exports = router;
