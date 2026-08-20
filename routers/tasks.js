const {
    createTask,
    toggleTask,
    deleteTask,
    updateTask,
    getTaskTitles,
    searchTasks,
    getMyTasks,
    getTaskById,
    getTasksSorted,
} = require("../controllers/tasks.controller");

const validateTask = require("../middlewares/validate-task.middleware");

const { 
    authMiddleware, 
} = require("../middlewares/auth.middleware");



const express = require("express");


const router = express.Router();

router.get("/", authMiddleware, getMyTasks);

router.get("/titles", authMiddleware, getTaskTitles);

router.get("/search", authMiddleware, searchTasks);

router.get("/:id", authMiddleware, getTaskById);

router.put("/:id", authMiddleware, updateTask);

router.patch("/:id/toggle", authMiddleware, toggleTask);

router.delete("/:id", authMiddleware, deleteTask);

router.post("/", authMiddleware, validateTask, createTask);

module.exports = router;