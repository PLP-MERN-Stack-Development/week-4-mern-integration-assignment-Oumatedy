const Task = require('../models/Task');

// POST /api/tasks - Create a new task
exports.createTask = async (req, res) => {
    const task = await Task.create({
        ...req.body,
        owner: req.user._id, // Set the owner to the authenticated user
    });
    res.json(task);
};

// GET /api/tasks - Get all tasks for the authenticated user
exports.getMyTasks = async (req, res) => {
    const tasks = await Task.find({ owner: req.user._id });
    res.json(tasks);

};

// GET /api/tasks/all - Get all tasks (admin only)
exports.getAllTasks = async (req, res) => {
    const tasks = await Task.find().populate('owner', 'email');
    res.json(tasks);
};
