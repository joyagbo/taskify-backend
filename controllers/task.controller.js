const Task = require('../models/task.model');


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
            owner: req.user._id
        });
        res.status(201).json({ message: "Task created successfully.", task });
    } catch (error) {
        res.status(500).json({ message: "Server error. Could not create task.", error: error.message });
    }
};

//get tasks for the authenticated user
// Supports search, completed status, pagination
exports.getTasks = async (req, res) => {
    const userId = req.user._id;
    // Extract query parameters
    // search: string, completed: boolean, page: number, limit: number
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