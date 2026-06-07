const express = require("express");

const tasksRouter = require("./routers/tasks");

const authRouter = require("./routers/auth.routes");

const logger = require("./middlewares/logger.middleware");

const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());

app.use(logger);

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Backend server is working");
});

app.use("/tasks", tasksRouter);

app.use(errorMiddleware);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});