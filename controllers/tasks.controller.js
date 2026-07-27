const {
    createTask: createTaskService,
    toggleTask: toggleTaskService,
    deleteTask: deleteTaskService,
    updateTask: updateTaskService,
    getTaskTitles: getTaskTitlesService,
    searchTasks: searchTasksService,
    getTasksByUserId: getTasksByUserIdService,
    getTasksCount: getTasksCountService,
} = require("../services/tasks.service");


async function createTask(req, res, next) {
    try {
        const { title } = req.body;

        const newTask = await createTaskService(
            title,
            req.user.id
        );

        res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
}

async function toggleTask(req, res, next) {
    try {
        const taskId = Number(req.params.id);

        const updatedTask = await toggleTaskService(taskId, req.user.id);

        res.json(updatedTask);

    } catch (error) {
        next(error);
    }
}

async function deleteTask(req, res, next) {
    try {
        const taskId = Number(req.params.id);

        const deletedTask = await deleteTaskService(taskId, req.user.id);

        res.json(deletedTask);
    } catch (error) {
        next(error);
    }
}

async function updateTask(req, res, next) {
    try {
        const taskId = Number(req.params.id);

        const updatedTask = await updateTaskService(taskId, req.body, req.user.id);

        res.json(updatedTask);
    
    } catch (error) {
        next(error);
    }
}

async function getTaskTitles(req, res, next) {
    try {
        const titles = await getTaskTitlesService(req.user.id);

    res.json(titles);
    } catch (error) {
        next(error);
    }
}

async function searchTasks(req, res, next) {

    try {
        const searchTitle = req.query.title;

        const filteredTasks = await searchTasksService(
            searchTitle,
            req.user.id
        );

        res.json(filteredTasks);
    } catch (error) {
        next(error);
    }
}

async function getMyTasks(req, res, next) {
    try {
        const sort = req.query.sort;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const completed = 
            req.query.completed === undefined ? undefined : req.query.completed === "true";

        const tasks = await getTasksByUserIdService(
            req.user.id, 
            sort, 
            page, 
            limit,
            completed
        );

        const totalTasks = await getTasksCountService(req.user.id);

        const totalPages = Math.ceil(totalTasks / limit);

        res.status(200).json({
            page,
            limit,
            totalTasks,
            totalPages,
            tasks
        });
    } catch (error) {
        next(error);
    }
}


module.exports = {
    createTask,
    toggleTask,
    deleteTask,
    updateTask,
    getTaskTitles,
    searchTasks,
    getMyTasks,
};