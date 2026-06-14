const {
    getUserById,
} = require("../services/users.service");

function getProfile(req, res, next) {
    try {
        const profile = getUserById(req.user.id);

        res.status(200).json(profile);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getProfile,
};