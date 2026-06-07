const {

registerUser,
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

module.exports = {
    register,
};