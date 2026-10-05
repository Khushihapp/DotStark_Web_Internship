import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import taskroutes from "./routes/taskroutes.js";
import authRoutes from "./routes/authRoute.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/tasks", taskroutes);

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT,"0.0.0.0", () => {
    console.log("Server running on port 5000");
});