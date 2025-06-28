const User = require('../models/userModel');
const Task = require('../models/taskModel');
const authMiddleware = require('../middleware/authMiddleware');


// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password -__v');
        res.status(200).json({ message: "Users retrieved successfully", users });
    } catch (error) {
        res.status(500).json({ message: "Server error. Could not retrieve users.", error: error.message });
    };
}

// Get all tasks
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate('owner', 'name email').sort({ createdAt: -1 });
        res.status(200).json({ message: "Tasks retrieved successfully", tasks });
    } catch (error) {
        res.status(500).json({ message: "Server error. Could not retrieve tasks.", error: error.message });
    }
};

// delete task
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            return res.status(404).json({ message: "Task not found" })
        };
        res.status(200).json({ message: "Task deleted successfully", task });
    } catch (error) {
        res.status(500).json({ message: "Server error. Could not delete task.", error: error.message });
    }
};

// delete user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server error. Could not delete user.", error: error.message });
    }
}




// Update user role

exports.updateUserRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
        return res.status(400).json({ message: "Invalid role specified. Must be 'user' or 'admin'." });
    }

    try {
        const user = await User.findByIdAndUpdate(
            id,
            { role },
            { new: true, runValidators: true }
        ).select('-password'); // Never return password

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ message: `User role updated to '${role}' successfully.`, user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

