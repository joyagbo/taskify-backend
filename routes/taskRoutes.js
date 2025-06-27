const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask, getTaskById } = require('../controllers/taskController');
const { authMiddleware } = require('../middleware/authMiddleware');



router.post('/create-task', authMiddleware, createTask);
router.get('/', authMiddleware, getTasks);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);
router.get('/:id', authMiddleware, getTaskById);



module.exports = router;