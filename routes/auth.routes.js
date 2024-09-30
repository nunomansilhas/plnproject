const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/middleware-auth.js');

// Login Route
router.post('/login', authController.login);

// Register Route
router.post('/register', authController.register);

module.exports = router;
