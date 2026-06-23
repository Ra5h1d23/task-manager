const pool = require("../config/db");

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

async function toggleTask(taskId, userId) {
    
    const result = await pool.query(
        `
        UPDATE tasks
        SET completed = NOT completed
        WHERE id = $1
        AND user_id = $2
        RETURNING *
        `,
        [taskId, userId]
    );

    if (result.rows.lenght === 0) {
        throw new NotFoundError("Task not found");
    }

    return result.rows[0];
}

async function deleteTask(taskId, userId) {
    
    const result = await pool.query(
        `
        DELETE FROM tasks
        WHERE id = $1
        AND user_id = $2
        RETURNING *
        `,
        [taskId, userId]
    );

    if (result.rows.length === 0) {
        throw new NotFoundError("Task not found");
    }

    return result.rows[0];
}

async function updateTask(taskId, data, userId) {
    
    const result = await pool.query(
        `
        UPDATE tasks
        SET 
            title = COALESCE($1, title),
            completed = COALESCE($2, completed)
        WHERE id = $3 
        AND user_id = $4
        RETURNING *
        `,
        [
            data.title, 
            data.completed, 
            taskId, 
            userId
        ]
    );

    if (result.rows.length === 0) {
        throw new NotFoundError("Task not found");
    }

    return result.rows[0];
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

async function searchTasks(searchTitle, userId) {

    const result = await pool.query(
        `
        SELECT *
        FROM tasks
        WHERE user_id = $1
        AND title ILIKE $2
        `,
        [userId, `%${searchTitle}%`]
    );

    return result.rows;
}

async function getTasksByUserId(userId,
                                sort = "asc",
                                page = 1,
                                limit = 10
                                ) {

    const order = sort === "desc" ? "DESC" : "ASC";

    const offset = (page - 1) * limit;
    
    const result = await pool.query(
        `
        SELECT *
        FROM tasks
        WHERE user_id = $1
        ORDER BY id ${order}
        LIMIT $2
        OFFSET $3
        `,
        [userId, limit, offset]
    );

    return result.rows;
}






    module.exports = {
        createTask,
        toggleTask,
        deleteTask,
        updateTask,
        getTaskTitles,
        searchTasks,
        getTasksByUserId,
    };
