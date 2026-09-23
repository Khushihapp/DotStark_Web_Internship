
const express = require("express");

const app = express();

const tasks = [
    { id: 1, title: "Learn React.js", completed: false },
    { id: 2, title: "Learn Node.js", completed: false }
];
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});
app.get("/tasks", (req, res) => {
    res.json(tasks);
});
console.log("ID route loaded");
app.get("/tasks/:id", (req, res) => {
    const id =Number(req.params.id);
    const task = tasks.find(task => task.id === id);
    res.json(task);
});


app.listen(3000, () => {
    console.log("Server running");
});