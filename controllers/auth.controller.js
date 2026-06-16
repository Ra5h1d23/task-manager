const {
registerUser,
loginUser,
} = require("../services/users.service");

const {
    generateToken,
} = require("../services/auth.service");


async function register(req, res, next) {
    try {

        const { email, password } = req.body;

        const newUser = await registerUser(email, password);

        res.status(201).json(newUser);

    } catch (error) {

        next(error);
    }
}

async function login(req, res, next) {
    try {

        const { email, password } = req.body;

        const loggedInUser = await loginUser(email, password);

        const token = generateToken(loggedInUser.id);

        res.status(200).json({
            token,
        });
    } catch (error) {

        next(error);
    }
}

module.exports = {
    register,
    login,
};