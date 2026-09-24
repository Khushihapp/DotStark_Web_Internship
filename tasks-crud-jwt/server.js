
const express = require("express");
require("dotenv").config();

const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.post("/login", (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    let role;

    if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
    ) {
        role = "admin";
    } 
    else if (
        email === process.env.USER_EMAIL &&
        password === process.env.USER_PASSWORD
    ) {
        role = "user";
    } 
    else {
        return res.status(401).json({
            message: "Unauthorized access"
        });
    }

    const token = jwt.sign(
        { email, role },
        process.env.JWT_SECRET
    );

    res.json({
        message: "Login Successful",
        token
    });
});

const taskRoutes = require("./routes/task-routes");

app.use("/", taskRoutes);

app.listen(process.env.PORT, () => {
    console.log("Server running");
});