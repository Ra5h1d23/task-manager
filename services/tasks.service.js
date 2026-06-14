const tasks = require("../data/tasks");

const NotFoundError = require("../errors/not-found.error");

function createTask(title) {
        const newTask = {
            id: tasks.length + 1,
            title,
            completed: false,
        };

        tasks.push(newTask);

        return newTask;
    }

function toggleTask(taskId) {
    const task = tasks.find((task) => {
        return task.id === taskId;
    });

    if (!task) {
        throw new NotFoundError("Task not found");
    }

    task.completed = !task.completed;

    return task;
}

function deleteTask(taskId) {
    const taskIndex = tasks.findIndex((task) => {
        return task.id === taskId;
    });

    if (taskIndex === -1) {
        throw new NotFoundError("Task not found");
    }

    const deletedTask = tasks.splice(taskIndex, 1);

    return deletedTask[0];
}

function updateTask(taskId, data) {
    const task = tasks.find((task) => {
        return task.id === taskId;
    });

    if (!task) {
        throw new NotFoundError("Task not found");
    }

    task.title = data.title ?? task.title;
    
    task.completed = data.completed ?? task.completed;

    return task;
}

function getTaskTitles () {
    return tasks.map((task) => {
        return task.title;
    });

};

function searchTasks(searchTitle) {

    return tasks.filter((task) => {
        return task.title
        .toLowerCase()
        .includes(searchTitle.toLowerCase());
    });
}

function getTasksByUserId(userId) {
    return tasks.filter((task) => {
        return task.userId === userId;
    });
}

function delay(ms) {

    return new Promise((resolve) => {

        setTimeout(() => {
            resolve();
        }, ms);
    });

}

    async function getTasksAsync() {

        await delay(2000);

        return tasks;
    }



    module.exports = {
        createTask,
        toggleTask,
        deleteTask,
        updateTask,
        getTaskTitles,
        searchTasks,
        getTasksAsync,
        getTasksByUserId,
    };
