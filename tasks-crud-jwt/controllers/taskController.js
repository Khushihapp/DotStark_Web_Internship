const taskService = require("../services/taskServices");

const getTasks = async (req, res) => {
    const tasks = await taskService.getTasks();
    res.json(tasks);
};

const createTask = async (req, res) => {
    const newTask = await taskService.createTask(req.body.title);
    res.status(201).json(newTask);
};

const updateTask = async (req, res) => {
    const task = await taskService.updateTask(
        req.params.id,
        req.body.title,
        req.body.completed
    );

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.json(task);
};

const deleteTask = async (req, res) => {
    const deleted = await taskService.deleteTask(req.params.id);

    if (!deleted) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.json({
        message: "Task deleted successfully"
    });
};

const uploadAttachment = (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            message: "File is required"
        });
    }

    res.json({
        message: "Attachment uploaded successfully",
        file: {
            filename: req.file.filename,
            path: req.file.path
        }
    });
};
const getTaskStats = async (req, res) => {
    const stats = await taskService.getTaskStats();
    res.json(stats);
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    uploadAttachment,
    getTaskStats
};
