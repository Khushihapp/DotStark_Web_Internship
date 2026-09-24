
const validateCreateTask = (req, res, next) => {
    const { title } = req.body;
    if (!title || typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({message: "Title is required"});
    }
    next();
};

const validateUpdateTask = (req, res, next) => {
    const { title, completed } = req.body;
    if (
        !title ||
        typeof title !== "string" ||
        title.trim() === "" ||
        typeof completed !== "boolean"
    ) {
        return res.status(400).json({message: "Title and completed are required"});
    }
    next();
};

module.exports = {
    validateCreateTask,
    validateUpdateTask
};