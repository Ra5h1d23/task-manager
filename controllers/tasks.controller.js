const {
    createTask: createTaskService,
    toggleTask: toggleTaskService,
    deleteTask: deleteTaskService,
    updateTask: updateTaskService,
    getTaskTitles: getTaskTitlesService,
    searchTasks: searchTasksService,
    getTasksAsync: getTasksAsyncService,
    getTasksByUserId: getTasksByUserIdService,
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

    const newTask = createTaskService(title);

    res.status(201).json(newTask);
}

function toggleTask(req, res, next) {
    try {
        const taskId = Number(req.params.id);

        const updatedTask = toggleTaskService(taskId);

        res.json(updatedTask);

    } catch (error) {
        next(error);
    }
}

function deleteTask(req, res, next) {
    try {
        const taskId = Number(req.params.id);

        const deletedTask = deleteTaskService(taskId);

        res.json(deletedTask);
    } catch (error) {
        next(error);
    }
}

function updateTask(req, res, next) {
    try {
        const taskId = Number(req.params.id);

        const updatedTask = updateTaskService(taskId, req.body);

        res.json(updatedTask);
    
    } catch (error) {
        next(error);
    }
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

function getMyTasks(req, res, next) {
    try {
        const tasks = getTasksByUserIdService(req.user.id);

        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getTasks,
    createTask,
    toggleTask,
    deleteTask,
    updateTask,
    getTaskTitles,
    searchTasks,
    getMyTasks,
};