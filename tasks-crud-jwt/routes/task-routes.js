const uploads= require("../middleware/uploads");
const authorizeRoles = require("../middleware/role");
const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const taskController = require("../controllers/taskController");
const {validateCreateTask, validateUpdateTask} = require("../middleware/validateTask");
router.get("/tasks/stats", authenticateToken, taskController.getTaskStats);
router.get(
    "/tasks",
    authenticateToken,
    authorizeRoles("admin", "user"),
    taskController.getTasks
);

router.post(
    "/tasks",
    authenticateToken,
    authorizeRoles("admin"),
    validateCreateTask,
    taskController.createTask
);

router.put(
    "/tasks/:id",
    authenticateToken,
    authorizeRoles("admin"),
    validateUpdateTask,
    taskController.updateTask
);

router.delete(
    "/tasks/:id",
    authenticateToken,
    authorizeRoles("admin"),
    taskController.deleteTask
);

router.post(
    "/tasks/:id/attachment",
    authenticateToken,
    uploads.single("attachment"),
    taskController.uploadAttachment
);

module.exports = router;