const User = require('../models/userModel');
const Task = require('../models/taskModel');
const authMiddleware = require('../middleware/authMiddleware');

// Get all users
exports.getAllUsers = async () => {
    return await User.find().select('-password -__v');
}

// Get all tasks
exports.getAllTasks = async () => {
    return await Task.find().populate('owner', 'name email').sort({ createdAt: -1 });
};

// delete task
exports.deleteTaskById = async (id) => {
    return await Task.findByIdAndDelete(id);
};

// delete user
exports.deleteUserById = async (id) => {
    return await User.findByIdAndDelete(id);
}

// Update user role
exports.updateUserRoleById = async (id, role) => {
    return await User.findByIdAndUpdate(
        id,
        { role },
        { new: true, runValidators: true }
    ).select('-password');// Never return password
}

