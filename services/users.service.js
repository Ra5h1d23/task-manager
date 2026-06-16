const pool = require("../config/db");

const ValidationError = require("../errors/validation.error");

const UnauthorizedError = require("../errors/unauthorized.error");

const NotFoundError = require("../errors/not-found.error");

async function registerUser(email, password) {

    const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    const existingUser = result.rows[0];

    if (existingUser) {
        throw new ValidationError(
            "Email already exists"
        );
    }

    return await createUser(email, password);
}
    
async function createUser(email, password) {

        const result = await pool.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
            [email, password]
        );

        return result.rows[0];
    }
           

function loginUser(email, password) {

    const user = users.find((user) => {
        return user.email === email;
    });

    if (!user) {
        throw new UnauthorizedError(
            "Invalid email or password"
        );
    }

    if (user.password !== password) {
        throw new UnauthorizedError(
            "Invalid email or password"
        );
    }

    return user;
}

function getUserById(id) {

    const user = users.find((user) => {
        return user.id === id;
    });

    if (!user) {
        throw new NotFoundError(
            "User not found"
        );
    }

    return {
        id: user.id,
        email: user.email,
    };
}


module.exports = {
    registerUser,
    loginUser,
    getUserById,
};
