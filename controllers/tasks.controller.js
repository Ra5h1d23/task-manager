const tasks = require("../data/tasks");

const {
    createTask: createTaskService,
    toggleTask: toggleTaskService,
    deleteTask: deleteTaskService,
    updateTask: updateTaskService,
} = require("../services/tasks.service");

function getTasks(req, res) {
    res.json(tasks);
}

function createTask(req, res) {
    const {title} = req.body;

    if (!title) {
        return res.status(400).json({
            message: "Title is required",
        });
    }

    const newTask = createTaskService(title);

    res.status(201).json(newTask);
}

function toggleTask(req, res) {
    const taskId = Number(req.params.id);

    const updatedTask = toggleTaskService(taskId);

    if (!updatedTask) {
        return res.status(404).json({
            message: "Task not found",
        });
    }

    res.json(updatedTask);
}

function deleteTask(req, res) {
    const taskId = Number(req.params.id);

    const deletedTask = deleteTaskService(taskId);

    if (!deletedTask) {
        return res.status(404).json({
            message: "Task not found",
        });
    }

    res.json(deletedTask);
}

function updateTask(req, res) {
    const taskId = Number(req.params.id);

    const updatedTask = updateTaskService(taskId, req.body);

    if (!updatedTask) {
        return res.status(404).json({
            message: "Task not found",
        });
    }

    res.json(updatedTask);
}


module.exports = {
    getTasks,
    createTask,
    toggleTask,
    deleteTask,
    updateTask,
};