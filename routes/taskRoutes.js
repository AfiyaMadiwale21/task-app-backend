import express from "express";
import Task from "../models/Task.js";
import auth from "../middleware/auth.js";
const router = express.Router();
router.post("/", auth, async (req, res) => {
    const { title, description, priority, dueDate } = req.body;
    const task = await Task.create({
        userId: req.user,
        title,
        description,
        priority,
        dueDate
    });
    res.json(task);
});
router.get("/", auth, async (req, res) => {
    const tasks = await Task.find({ userId: req.user });
    res.json(tasks);
});

router.put("/:id", auth, async (req, res) => {
    const updated = await Task.findOneAndUpdate(
        { _id: req.params.id, userId: req.user },
        req.body,
        { new: true }
    );
    res.json(updated);
});
router.delete("/:id", auth, async (req, res) => {
    await Task.findOneAndDelete({ _id: req.params.id, userId: req.user });
    res.json({ message: "task deleted" });
});
export default router;