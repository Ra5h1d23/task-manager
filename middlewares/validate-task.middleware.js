const ValidationError = require("../errors/validation.error");

function validateTask(req, res, next) {

    const { title } = req.body;

    if (!title) {
        throw new ValidationError("Title is required");
    }

    next();
}

module.exports = validateTask;