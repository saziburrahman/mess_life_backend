const Attendance = require("../models/Attendance");
const asyncHandler = require("express-async-handler");

const markAttendance = asyncHandler(async (req, res) => {
  try {
    const { userId, mealId, mealType, attendanceDate, guestMeals, quantity } =
      req.body;
    const attendance = new Attendance({
      userId,
      mealId,
      mealType,
      attendanceDate,
      isPresent: true,
      guestMeals: guestMeals || 0,
      quantity: quantity || 1,
    });
    await attendance.save();
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

const getAttendance = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const attendanceRecords = await Attendance.find({ userId }).populate(
      "mealId",
      "menu"
    );
    res.json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = { markAttendance, getAttendance };
