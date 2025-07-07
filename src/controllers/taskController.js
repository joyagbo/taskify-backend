const Task = require('../models/taskModel');


// Create a new task
exports.createTask = async (req, res) => {
    const { title, description, dueDate } = req.body;
    if (!title || !dueDate) {
        return res.status(400).json({ message: "Title and due date are required." });
    }
    try {
        const task = await Task.create({
            title,
            description,
            dueDate,
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
    // Extract query parameters

    const { search, completed, page = 1, limit = 10 } = req.query;
    const query = { owner: userId };
    // Build the query based on search and completed parameters
    if (completed) {
        query.completed = completed === 'true';
    }

    if (search) {
        query.$or = [
            { title: new RegExp(search, 'i') },
            { description: new RegExp(search, 'i') }
        ]
    }

    try {
        const tasks = await Task.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Task.countDocuments(query);
        res.status(200).json({
            message: "Tasks retrieved successfully.",
            tasks,
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        res.status(500).json({ message: "Server error. Could not retrieve tasks." });
    }
}

exports.getTaskById = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
        //find task by id and owner
        const task = await Task.findOne({ _id: id, owner: userId });
        if (!task) {
            return res.status(404).json({ message: "Task not found or you do not have permission to access this task." });
        }
        res.status(200).json({ message: "Task retrieved successfully.", task });
    } catch (error) {
        res.status(500).json({ message: "Server error. Could not find task.", error: error.message });
    }
}

exports.updateTask = async (req, res) => {
    const taskId = req.params.id;
    const userId = req.user.userId;

    try {
        //find task by id and owner
        const task = await Task.findOne({ _id: taskId, owner: userId });
        if (!task) {
            return res.status(404).json({ message: "Task not found or you do not have permission to update this task." });
        }

        //update task
        const { title, description, completed, dueDate } = req.body;
        if (!title || !dueDate) {
            return res.status(400).json({ message: "Title and due date are required." });
        }

        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (completed !== undefined) task.completed = completed;
        if (dueDate !== undefined) task.dueDate = dueDate;

        await task.save();
        res.status(200).json({ message: "Task updated successfully.", task });
    } catch (error) {
        res.status(500).json({ message: "Server error. Could not update task.", error: error.message });
    }
}

exports.deleteTask = async (req, res) => {
    const taskId = req.params.id;
    const userId = req.user.userId;

    try {
        const task = await Task.findOneAndDelete({ _id: taskId, owner: userId });
        if (!task) {
            return res.status(404).json({ message: "Task not found or you do not have permission to delete this task." });
        }

        res.status(200).json({ message: "Task deleted successfully." });

    } catch (error) {
        res.status(500).json({ message: "Server error. Could not delete task.", error: error.message });
    }
}