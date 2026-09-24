const taskService = require("../services/taskServices");

const getTasks =(req,res) =>{
    const tasks = taskService.getTasks();
    res.json(tasks);
};

const createTask =(req,res) =>{
    const newTask = taskService.createTask(req.body.title);
    res.status(201).json(newTask);
}

const updateTask = (req ,res)  => {
    const id = Number(req.params.id);
    const task = taskService.updateTask(
        id,
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

const deleteTask = (req,res) => {
     const id = Number(req.params.id);
    const deleted = taskService.deleteTask(id);
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
module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    uploadAttachment
};