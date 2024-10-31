const express = require("express");
const {
  addExpense,
  updateExpense,
  addBoarderDeposit,
} = require("../controllers/expenseController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, addExpense);
router.put("/update/:expenseId", authMiddleware, updateExpense);
router.post(
  "/:messId/boarder/:boarderId/deposit",
  authMiddleware,
  addBoarderDeposit
);

module.exports = router;
