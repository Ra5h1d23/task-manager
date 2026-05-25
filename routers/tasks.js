const {
    getTasks,
    createTask,
    toggleTask,
    deleteTask,
    updateTask,
    getTaskTitles,
    searchTasks,
} = require("../controllers/tasks.controller");

const validateTask = require("../middlewares/validate-task.middleware");



const express = require("express");


const router = express.Router();

router.get("/", getTasks);

router.post("/", validateTask, createTask);

router.get("/titles", getTaskTitles);

router.get("/search", searchTasks);

router.put("/:id", updateTask);

router.patch("/:id/toggle", toggleTask);

router.delete("/:id", deleteTask);

module.exports = router;