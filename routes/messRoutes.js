const express = require("express");
const {
  createMess,
  joinMess,
  calculateMonthlyCosts,
  getIndividualCostAndDeposit,
} = require("../controllers/messController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createMess);
router.post("/join", authMiddleware, joinMess);
router.get(
  "/:messId/monthly-cost/:month",
  authMiddleware,
  calculateMonthlyCosts
);
router.get(
  "/:userId/individual-cost",
  authMiddleware,
  getIndividualCostAndDeposit
);

module.exports = router;
