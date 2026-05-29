const tasks = require("../data/tasks");

const {
    createTask: createTaskService,
    toggleTask: toggleTaskService,
    deleteTask: deleteTaskService,
    updateTask: updateTaskService,
    getTaskTitles: getTaskTitlesService,
    searchTasks: searchTasksService,
    getTasksAsync: getTasksAsyncService,
} = require("../services/tasks.service");

async function getTasks(req, res, next) {

    try {

        const tasks = await getTasksAsyncService();

        res.json(tasks);
    
    } catch (error) {

        next(error);

    }

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

function getTaskTitles(req, res) {
    const titles = getTaskTitlesService();

    res.json(titles);
}

function searchTasks(req, res) {

    const searchTitle = req.query.title;

    const filteredTasks = searchTasksService(searchTitle);
    
    res.json(filteredTasks);
}


module.exports = {
    getTasks,
    createTask,
    toggleTask,
    deleteTask,
    updateTask,
    getTaskTitles,
    searchTasks,
};