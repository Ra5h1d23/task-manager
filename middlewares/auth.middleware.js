const jwt = require("jsonwebtoken");

const UnauthorizedError = require("../errors/unauthorized.error");

const { SECRET_KEY } = require("../config/jwt");

function authMiddleware(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new UnauthorizedError(
            "Unauthorized"
        );
    }

    const parts = authHeader.split(" ");
    const token = parts[1];

    const decoded = jwt.verify(token, SECRET_KEY);

    req.user = decoded;

    next();
}

module.exports = {
    authMiddleware,
};