
const express = require("express");
const { register,login } = require("../controllers/authController");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/profile", authenticateToken, (req, res) => {
    res.json({
        message: "You can access this protected route",
        user: req.user
    });
});

router.post("/register", register);
router.post("/login",login);
module.exports = router;