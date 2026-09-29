const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const connectDB= require("./config/db");
dotenv.config();
console.log(process.env.MONGO_URI);
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoute");

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
    console.log("Server running on port 5000");
});

