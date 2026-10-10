import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import equipmentRoute from "./routes/equipmentRoute.js";
import bookingRoute from "./routes/bookingRoute.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/equipment", equipmentRoute);
app.use("/api/bookings", bookingRoute);
app.get("/", (req, res) => {
  res.send("Equipment Rental API is running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
