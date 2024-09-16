import Task from '../models/Task.js';
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate('userId');
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching tasks' });
    }
};
export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('userId');
        if (!task)
            return res.status(404).json({ error: 'Task not found' });
        res.json(task);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching task' });
    }
};
export const createTask = async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    }
    catch (error) {
        res.status(400).json({ error: 'Error creating task' });
    }
};
export const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task)
            return res.status(404).json({ error: 'Task not found' });
        res.json(task);
    }
    catch (error) {
        res.status(400).json({ error: 'Error updating task' });
    }
};
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task)
            return res.status(404).json({ error: 'Task not found' });
        res.json({ message: 'Task deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting task' });
    }
};
