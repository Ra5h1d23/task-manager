const tasks = require("../data/tasks");

const {
    createTask: createTaskService,
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

module.exports = {
    getTasks,
    createTask,
};