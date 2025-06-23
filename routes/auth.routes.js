const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');


// Register a new user
router.post('/register', register);
// Login a user
router.post('/login', login);


module.exports = router;