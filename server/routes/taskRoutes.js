const express = require('express');
const { createTask, getMyTasks, getAllTasks } = require('../controllers/taskController');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

// protect all routes
router.post('/', protect, createTask); // Create a new task
router.get('/', protect, getMyTasks); // Get all tasks for the authenticated user
router.get('/all', protect, authorize('admin'), getAllTasks); // Get all tasks (admin only)

// Export the router
module.exports = router;
