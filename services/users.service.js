const pool = require("../config/db");

const bcrypt = require("bcrypt");

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

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
            [email, hashedPassword]
        );

        return result.rows[0];
    }
           

async function loginUser(email, password) {

    const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    const user = result.rows[0];

    if (!user) {
        throw new UnauthorizedError(
            "Invalid email or password"
        );
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new UnauthorizedError(
            "Invalid email or password"
        );
    }

    return user;
}

async function getUserById(id) {

    const result = await pool.query(
        "SELECT id, email FROM users WHERE id = $1",
        [id]
    );

    const user = result.rows[0];

    if (!user) {
        throw new NotFoundError(
            "User not found"
        );
    }

    return user;
}


module.exports = {
    registerUser,
    loginUser,
    getUserById,
};
