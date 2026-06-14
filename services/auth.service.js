const jwt = require("jsonwebtoken");

const { SECRET_KEY } = require("../config/jwt");

function generateToken(userId) {

    const token = jwt.sign({ id: userId }, SECRET_KEY);

    return token;
}

module.exports = {
    generateToken,
};