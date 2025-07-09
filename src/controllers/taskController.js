const taskService = require('../services/task.service');


// Create a new task
exports.createTask = async (req, res) => {
    const { title, description, dueDate, status } = req.body;
    if (!title || !dueDate) {
        return res.status(400).json({ message: "Title and due date are required." });
    }
    try {
        const task = await taskService.createTask({
            title,
            description,
            dueDate,
            status: status || 'pending',
            owner: req.user.userId
        });
        res.status(201).json({ message: "Task created successfully.", task });
    } catch (error) {
        res.status(500).json({ message: "Server error. Could not create task.", error: error.message });
    }
};

//get tasks for the authenticated user

exports.getTasks = async (req, res) => {
    const userId = req.user.userId;
    const { search, status, page = 1, limit = 10 } = req.query;

    try {
        const { tasks, total } = await taskService.getTasks({
            userId,
            search,
            status,
            page: parseInt(page),
            limit: parseInt(limit)
        });
        res.status(200).json({
            message: "Tasks retrieved successfully.",
            tasks,
            total,

            page: parseInt(page),
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        res.status(500).json({ message: "Server error. Could not retrieve tasks.", error: error.message });
    }
};

exports.getTaskById = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;
    try {
        //find task by id and owner
        const task = await taskService.getTaskById({ taskId: id, userId });
        if (!task) {
            return res.status(404).json({ message: "Task not found or you do not have permission to access this task." });
        }
        res.status(200).json({ message: "Task retrieved successfully.", task });
    } catch (error) {
        res.status(500).json({ message: "Server error. Could not find task.", error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    const taskId = req.params.id;
    const userId = req.user.userId;
    try {
        //find task by id and owner
        const task = await taskService.findTaskForUser({ taskId, userId });
        if (!task) {
            return res.status(404).json({ message: "Task not found or you do not have permission to update this task." });
        }

        //update task
        const { title, description, completed, dueDate } = req.body;
        if (!title || !dueDate) {
            return res.status(400).json({ message: "Title and due date are required." });
        }

        const updates = {};
        if (title !== undefined) updates.title = title;
        if (description !== undefined) updates.description = description;
        if (completed !== undefined) updates.completed = completed;
        if (dueDate !== undefined) updates.dueDate = dueDate;

        const updatedTask = await taskService.updateTask({ task, updates });
        res.status(200).json({ message: "Task updated successfully.", task: updatedTask });
    } catch (error) {
        res.status(500).json({ message: "Server error. Could not update task.", error: error.message });
    }
};


exports.deleteTask = async (req, res) => {
    const taskId = req.params.id;
    const userId = req.user.userId;
    try {
        //find task by id and owner
        const task = await taskService.deleteTask({ taskId, userId });
        if (!task) {
            return res.status(404).json({ message: "Task not found or you do not have permission to delete this task." });
        }
        res.status(200).json({ message: "Task deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Server error. Could not delete task.", error: error.message });
    }
};