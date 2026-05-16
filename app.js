const express = require("express");

const tasksRouter = require("./routers/tasks");

const app = express();

app.use(express.json());

const PORT = 3000;



app.get("/", (req, res) => {
  res.send("Backend server is working");
});

app.use("/tasks", tasksRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});