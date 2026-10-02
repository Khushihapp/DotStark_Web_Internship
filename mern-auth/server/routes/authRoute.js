import express from "express";
import { register, login } from "../controllers/authController.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", authenticateToken, (req, res) => {
    res.json({
        message: "You can access this protected route",
        user: req.user
    });
});

router.post("/register", register);

router.post("/login", login);

export default router;