const users = require("../data/users");

const ValidationError = require("../errors/validation.error");

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


module.exports = {
    registerUser,
};