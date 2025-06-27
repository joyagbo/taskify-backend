const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const { getAllUsers, getAllTasks, deleteTask, deleteUser } = require('../controllers/adminController');

router.get('/users', authMiddleware, adminMiddleware, getAllUsers);
router.get('/tasks', authMiddleware, adminMiddleware, getAllTasks);
router.delete('/task/:id', authMiddleware, adminMiddleware, deleteTask);
router.delete('/user/:id', authMiddleware, adminMiddleware, deleteUser);



module.exports = router;