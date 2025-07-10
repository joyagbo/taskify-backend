const Task = require('../models/taskModel');


exports.createTask = async (data) => {
    return await Task.create(data);
}

exports.getTasks = async ({ userId, search, status, page, limit }) => {
    const query = { owner: userId };

    if (status !== undefined) {
        query.status = status;
    }


    if (search) {
        query.$or = [
            { title: new RegExp(search, 'i') },
            { description: new RegExp(search, 'i') }
        ];
    }

    const tasks = await Task.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

    const total = await Task.countDocuments(query);
    return { tasks, total };
}

exports.getTaskById = async ({ taskId, userId }) => {
    return await Task.findOne({ _id: taskId, owner: userId });
}

exports.updateTask = async ({ task, updates }) => {
    Object.assign(task, updates);
    return await task.save();
}

exports.deleteTask = async ({ taskId, userId }) => {
    return await Task.findOneAndDelete({ _id: taskId, owner: userId });
}


