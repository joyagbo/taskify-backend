const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const { getAllUsers, } = require('../controllers/adminController');

router.get('/users', authMiddleware, adminMiddleware, getAllUsers);


module.exports = router;