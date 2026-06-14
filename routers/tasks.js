const {
    getTasks,
    createTask,
    toggleTask,
    deleteTask,
    updateTask,
    getTaskTitles,
    searchTasks,
    getMyTasks,
} = require("../controllers/tasks.controller");

const validateTask = require("../middlewares/validate-task.middleware");

const { 
    authMiddleware, 
} = require("../middlewares/auth.middleware");



const express = require("express");


const router = express.Router();

router.get("/", authMiddleware, getMyTasks);

router.post("/", validateTask, createTask);

router.get("/titles", getTaskTitles);

router.get("/search", searchTasks);

router.put("/:id", updateTask);

router.patch("/:id/toggle", toggleTask);

router.delete("/:id", deleteTask);

module.exports = router;