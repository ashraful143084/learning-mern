const express = require("express");
const tasksRouter = express.Router();
const { body, validationResult } = require("express-validator");
const tasksController = require("../controllers/tasks.controller.js");
const { StatusCodes } = require("http-status-codes");
const { createTaskValidator } = require("../validators/task.validator.js");

tasksRouter.get("/tasks", tasksController.handleGetTasks);
tasksRouter.post("/tasks", createTaskValidator, (req, res) => {
  const result = validationResult(req);
  console.log(result);
  if (result.isEmpty()) {
    return tasksController.handlePostTasks(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});
tasksRouter.patch("/tasks", tasksController.handlePatchTasks);
tasksRouter.delete("/tasks", tasksController.handleDeleteTasks);

module.exports = tasksRouter;
