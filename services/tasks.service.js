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

    module.exports = {
        createTask,
    };
