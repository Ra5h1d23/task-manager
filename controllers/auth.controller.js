const {

registerUser,
loginUser,
} = require("../services/users.service");


function register(req, res, next) {
    try {

        const { email, password } = req.body;

        const newUser = registerUser(email, password);

        res.status(201).json(newUser);

    } catch (error) {

        next(error);
    }
}

function login(req, res, next) {
    try {

        const { email, password } = req.body;

        const loggedInUser = loginUser(email, password);

        res.status(200).json(loggedInUser);
    } catch (error) {

        next(error);
    }
}

module.exports = {
    register,
    login,
};