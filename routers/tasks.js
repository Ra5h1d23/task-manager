const {
    getTasks,
    createTask,
    toggleTask,
    deleteTask,
} = require("../controllers/tasks.controller");



const express = require("express");


const router = express.Router();

router.get("/", getTasks);

router.post("/", createTask);

router.get("/titles", (req, res) => {
    const titles = tasks.map((task) => {
        return task.title;
    });

    res.json(titles);
});

router.get("/search", (req, res) => {
    const searchTitle = req.query.title;

    const filteredTasks = tasks.filter((task) => {
        return task.title
        .toLowerCase()
        .includes(searchTitle.toLowerCase());
    });

    res.json(filteredTasks);
});




router.put("/:id", (req, res) => {
    const taskId = Number(req.params.id);

    const task = findTaskById(taskId);

    if (!task) {
        return res.status(404).json({
            message: "Task not found",
        });
    }

    task.title = req.body.title ?? task.title;
    task.completed = req.body.completed ?? task.completed;

    res.json(task);
});

router.patch("/:id/toggle", toggleTask);

router.delete("/:id", deleteTask);

module.exports = router;