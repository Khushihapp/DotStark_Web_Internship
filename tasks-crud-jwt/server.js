const express = require("express");
require("dotenv").config();

const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

app.post("/login",(req, res)=> {
    const email = req.body.email;
    const password = req.body.password;

    if (email === process.env.LOGIN_EMAIL && password === process.env.LOGIN_PASSWORD){
        const token = jwt.sign({email},process.env.JWT_SECRET);
        res.json({message : "Login Successful" , token});
    } else {
        res.status(401).json({message: "Unauthorized access"});
    }
});
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({message: "Authorization header missing"});
    }
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({message: "Invalid or expired token"});
    }
}
const tasks = [
    { id: 1, title: "Learn React", completed: false },
    { id: 2, title: "Learn Node.js", completed: false }
];
app.get("/tasks", authenticateToken,(req,res)=>{
    res.json(tasks);
});
app.post("/tasks",authenticateToken,(req,res) =>{
    const newTask ={
        id : tasks.length +1 ,
        title : req.body.title,
        completed: false 
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});
app.put("/tasks/:id",authenticateToken,(req,res) =>{
    const id = Number(req.params.id);
    const task = tasks.find(task=> task.id === id);
    if (!task){
        return res.status(404).json({message: "Task not found"});
    }
    task.title= req.body.title;
    task.completed = req.body.completed;

    res.json(task);
});
app.delete("/tasks/:id",authenticateToken,(req,res)=>{
    const id = Number(req.params.id);
    const index = tasks.findIndex(task => task.id === id);
    if (index === -1){
         return res.status(404).json({message:"task not found"});
    }else{
        tasks.splice(index,1);
        res.json({message:"Task deleted successfully"});

    }
});
app.listen(process.env.PORT, () => {
    console.log("Server running");
});