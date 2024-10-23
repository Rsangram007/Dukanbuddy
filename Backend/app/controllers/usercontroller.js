const User = require('../models/usermodel');
const { validationResult } = require('express-validator');
const userCltr = {};

// Create a new user
userCltr.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, age, note, hobby, sport } = req.body;
    try {
        const user = new User({ name, email, age, note, hobby, sport });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// Get all users
userCltr.getAll = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// Get a single user by ID
userCltr.getById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// Update a user by ID
userCltr.update = async (req, res) => {
    const { id } = req.params;
    const { name, email, age, note, hobby, sport } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, { name, email, age, note, hobby, sport }, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// Delete a user by ID
userCltr.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports = userCltr;
