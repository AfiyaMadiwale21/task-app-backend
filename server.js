import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("mongodb connected");
    app.listen(process.env.PORT, () => {
        console.log(`server is running on ${process.env.PORT}`);
    });
}).catch((error) =>
    console.log("mongodb error:", error)
);