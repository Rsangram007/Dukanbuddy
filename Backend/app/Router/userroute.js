const express = require('express');
const { body } = require('express-validator');
const userCltr = require('../controllers/usercontroller');
const authenticateUser = require('../middlewares/authenticateUser')
const router = express.Router();

// Create user
router.post('/users',authenticateUser, [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is invalid'),
    body('age').isNumeric().withMessage('Age must be a number')
], userCltr.create);

// Get all users
router.get('/users',authenticateUser, userCltr.getAll);

// Get a single user by ID
router.get('/users/:id',authenticateUser, userCltr.getById);

// Update a user by ID
router.put('/users/:id',authenticateUser, [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is invalid'),
    body('age').isNumeric().withMessage('Age must be a number')
], userCltr.update);

// Delete a user by ID
router.delete('/users/:id',authenticateUser, userCltr.delete);

module.exports = router;
