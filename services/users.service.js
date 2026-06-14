const users = require("../data/users");

const ValidationError = require("../errors/validation.error");

const UnauthorizedError = require("../errors/unauthorized.error");

const NotFoundError = require("../errors/not-found.error");

function registerUser(email, password) {

    const existingUser = users.find((user) => {
        return user.email === email;
    });

    if (existingUser) {
        throw new ValidationError(
            "Email already exists"
        );
    }

    return createUser(email, password);
}
    
function createUser(email, password) {

        const newUser = {
            id: users.length + 1,
            email,
            password,
        };

        users.push(newUser);

        return newUser;

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