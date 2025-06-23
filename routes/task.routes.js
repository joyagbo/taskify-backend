const express = require('express');
const router = express.Router();
const { createTask, getTasks } = require('../controllers/task.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/create-task', authMiddleware, createTask);
router.get('/get-tasks', authMiddleware, getTasks);

module.exports = router;