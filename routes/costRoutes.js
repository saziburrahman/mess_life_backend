const express = require("express");
const {
  calculateMonthlyCost,
} = require("../controllers/monthlyCostController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, calculateMonthlyCost);

module.exports = router;
