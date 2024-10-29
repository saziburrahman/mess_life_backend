const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    menu: { type: String },
    isSpecial: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Meal', mealSchema);
