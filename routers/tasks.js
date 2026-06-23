const {
    createTask,
    toggleTask,
    deleteTask,
    updateTask,
    getTaskTitles,
    searchTasks,
    getMyTasks,
    getTasksSorted,
} = require("../controllers/tasks.controller");

const validateTask = require("../middlewares/validate-task.middleware");

const { 
    authMiddleware, 
} = require("../middlewares/auth.middleware");



const express = require("express");


const router = express.Router();

router.get("/", authMiddleware, getMyTasks);

router.post("/", authMiddleware, validateTask, createTask);

router.get("/titles", authMiddleware, getTaskTitles);

router.get("/search", authMiddleware, searchTasks);

router.put("/:id", authMiddleware, updateTask);

router.patch("/:id/toggle", authMiddleware, toggleTask);

router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;