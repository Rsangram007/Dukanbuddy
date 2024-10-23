const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    note: { type: String, required: false },
    hobby: { type: String, required: false },
    sport: { type: String, required: false }
}, { timestamps: true });

const User = model('Data', userSchema);

module.exports = User;
