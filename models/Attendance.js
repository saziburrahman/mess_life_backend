const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    mealId: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal', required: true },
    mealType: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner'], required: true },
    attendanceDate: { type: Date, required: true },
    isPresent: { type: Boolean, default: true },
    guestMeals: { type: Number, default: 0 },
    quantity: { type: Number, default: 1 },
});

module.exports = mongoose.model('Attendance', attendanceSchema);
