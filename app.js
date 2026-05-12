const express = require("express");

const app = express();

const PORT = 3000;

const tasks = [
  {
    id: 1,
    title: "Learn Node.js",
    completed: false,
  },
  {
    id: 2,
    title: "Build backend API",
    completed: true,
  },
];

app.get("/", (req, res) => {
  res.send("Backend server is working");
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});