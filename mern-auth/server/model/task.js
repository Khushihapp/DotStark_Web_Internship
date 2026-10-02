import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: String,

    completed: Boolean,

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
