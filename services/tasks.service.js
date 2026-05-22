const tasks = require("../data/tasks");

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
        return null;
    }

    task.completed = !task.completed;

    return task;
}

function deleteTask(taskId) {
    const taskIndex = tasks.findIndex((task) => {
        return task.id === taskId;
    });

    if (taskIndex === -1) {
        return null;
    }

    const deletedTask = tasks.splice(taskIndex, 1);

    return deletedTask[0];
}

function updateTask(taskId, data) {
    const task = tasks.find((task) => {
        return task.id === taskId;
    });

    if (!task) {
        return null;
    }

    task.title = data.title ?? task.title;
    
    task.completed = data.completed ?? task.completed;

    return task;
}


    module.exports = {
        createTask,
        toggleTask,
        deleteTask,
        updateTask,
    };
