const {
    getTasks,
    createTask,
    toggleTask,
    deleteTask,
    updateTask,
    getTaskTitles,
} = require("../controllers/tasks.controller");



const express = require("express");


const router = express.Router();

router.get("/", getTasks);

router.post("/", createTask);

router.get("/titles", getTaskTitles);

router.get("/search", (req, res) => {
    const searchTitle = req.query.title;

    const filteredTasks = tasks.filter((task) => {
        return task.title
        .toLowerCase()
        .includes(searchTitle.toLowerCase());
    });

    res.json(filteredTasks);
});




router.put("/:id", updateTask);

router.patch("/:id/toggle", toggleTask);

router.delete("/:id", deleteTask);

module.exports = router;