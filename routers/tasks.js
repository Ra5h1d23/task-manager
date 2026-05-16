const express = require("express");

const router = express.Router();

const tasks = [
  {
    id: 1,
    title: "Learn Node.js",
    completed: false,
  },
];

router.get("/", (req, res) => {
  res.json(tasks);
});

router.get("/titles", (req, res) => {
    const titles = tasks.map((task) => {
        return task.title;
    });

    res.json(titles);
});

router.post("/", (req, res) => {
    if (!req.body.title)
{
    return res.status(400).json({
        message: "Title is required",
    });
    
}    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false,
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

router.delete("/:id", (req, res) => {
    const taskId = Number(req.params.id);

    const filteredTasks = tasks.filter((task) => {
        return task.id !== taskId;
    });

    tasks.length = 0;
    tasks.push(...filteredTasks);

    res.json({
        message: "Task deleted successfully",
    })
});

router.put("/:id", (req, res) => {
    const taskId = Number(req.params.id);

    const task = tasks.find((task) => {
        return task.id === taskId;
    });

    if (!task) {
        return res.status(404).json({
            message: "Task not found",
        });
    }

    task.title = req.body.title ?? task.title;
    task.completed = req.body.completed ?? task.completed;

    res.json(task);
});

module.exports = router;