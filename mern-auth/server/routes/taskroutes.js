import authenticateToken from "../middleware/authMiddleware.js";

import express from "express";
import Task from "../model/task.js";

const router = express.Router();
router.post("/", authenticateToken, async (req, res) => {
    try {
        const { title } = req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({
                message: "Task title is required"
            });
        }

        if (title.trim().length < 3) {
            return res.status(400).json({
                message: "Task title must be at least 3 characters"
            });
        }

        const task = await Task.create({
            title: title.trim(),
            completed: false,
            user: req.user.userId
        });

        res.status(201).json(task);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});
router.get("/", authenticateToken, async (req, res) => {
    try {
        let tasks;
        if (req.user.role === "admin") {
            tasks = await Task.find();
        } else {
            tasks = await Task.find({
                user: req.user.userId
            });
        }

        res.status(200).json(tasks);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch tasks"
        });
    }
});
router.put("/:id", authenticateToken, async (req, res) => {
    try {
        let task;

        if (req.user.role === "admin") {
    
            task = await Task.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
        } else {
            task = await Task.findOneAndUpdate(
                {
                    _id: req.params.id,
                    user: req.user.userId
                },
                req.body,
                { new: true }
            );
        }

        if (!task) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        res.status(200).json(task);

    } catch (error) {
        res.status(500).json({
            message: "Failed to update task"
        });
    }
});
router.delete("/:id", authenticateToken, async (req, res) => {
    try {
        let task;

        if (req.user.role === "admin") {
            task = await Task.findByIdAndDelete(req.params.id);
        } else {
        
            task = await Task.findOneAndDelete({
                _id: req.params.id,
                user: req.user.userId
            });
        }

        if (!task) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        res.status(200).json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete task"
        });
    }
});

export default router;