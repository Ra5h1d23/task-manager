const {
    getUserById,
} = require("../services/users.service");

async function getProfile(req, res, next) {
    try {
        const profile = await getUserById(req.user.id);

        res.status(200).json(profile);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getProfile,
};