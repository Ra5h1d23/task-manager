const pool = require("../config/db");

const tasks = require("../data/tasks");

const NotFoundError = require("../errors/not-found.error");

async function createTask(title, user_Id) {

        const result = await pool.query(
            `
            INSERT INTO tasks (title, completed, user_id)
            VALUES ($1, $2, $3)
            RETURNING *
            `,
            [title, false, user_Id]
        );

        return result.rows[0];
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

async function getTaskTitles (userId) {
    const result = await pool.query(
        `
        SELECT title
        FROM tasks
        WHERE user_id = $1
        `,
        [userId]
    );

    return result.rows.map((row) => row.title);
}

function searchTasks(searchTitle) {

    return tasks.filter((task) => {
        return task.title
        .toLowerCase()
        .includes(searchTitle.toLowerCase());
    });
}

async function getTasksByUserId(userId) {
    const result = await pool.query(
        `
        SELECT *
        FROM tasks
        WHERE user_id = $1
        `,
        [userId]
    );

    return result.rows;
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
