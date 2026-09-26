const Task = require("../models/task");

const getTasks = async () => {
    return await Task.find();
};

const createTask = async (title) => {
    return await Task.create({
        title: title,
        completed: false
    });
};

const updateTask = async (id, title, completed) => {
    return await Task.findByIdAndUpdate(
        id,
        {
            title: title,
            completed: completed
        },
        {
            new: true,
            runValidators: true
        }
    );
};

const deleteTask = async (id) => {
    const deletedTask = await Task.findByIdAndDelete(id);
    return deletedTask !== null;
};

const getTaskStats = async () => {
    return await Task.aggregate([
        {
            $group: {_id: "$completed",count: { $sum: 1 } }
        }
    ]);
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    getTaskStats
};
