const Attendance = require("../models/Attendance");
const asyncHandler = require("express-async-handler");

// Mark attendance
const markAttendance = asyncHandler(async (req, res) => {
  const { userId, mealId, mealType, attendanceDate, guestMeals, quantity } =
    req.body;

  if (!userId || !mealId || !mealType || !attendanceDate) {
    const validationError = new Error(
      "userId, mealId, mealType, and attendanceDate are required"
    );
    validationError.statusCode = 400;
    throw validationError;
  }

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
});

// Get attendance records for a user
const getAttendance = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    const missingParamError = new Error("userId is required");
    missingParamError.statusCode = 400;
    throw missingParamError;
  }

  const attendanceRecords = await Attendance.find({ userId }).populate(
    "mealId",
    "menu"
  );

  if (!attendanceRecords.length) {
    const noRecordsError = new Error(
      "No attendance records found for this user"
    );
    noRecordsError.statusCode = 404;
    throw noRecordsError;
  }

  res.json(attendanceRecords);
});

module.exports = { markAttendance, getAttendance };
