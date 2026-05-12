const express = require("express");

const router = express.Router();

const tasks = [
  {
    id: 1,
    title: "Learn Node.js",
    completed: false,
  },
];

router.get("/", (req, res) => {
  res.json(tasks);
});

module.exports = router;