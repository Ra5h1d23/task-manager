const express = require("express");

const router = express.Router();

const {
    getProfile,
} = require("../controllers/users.controller");

const { 
    authMiddleware 
} = require("../middlewares/auth.middleware");

router.get("/profile", authMiddleware, getProfile);

module.exports = router;