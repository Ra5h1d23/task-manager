const express = require("express");

const tasksRouter = require("./routers/tasks");

const logger = require("./middlewares/logger.middleware");

const app = express();

app.use(express.json());

app.use(logger);

const PORT = 3000;



app.get("/", (req, res) => {
  res.send("Backend server is working");
});

app.use("/tasks", tasksRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});