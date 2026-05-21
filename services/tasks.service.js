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
    module.exports = {
        createTask,
        toggleTask,
    };
