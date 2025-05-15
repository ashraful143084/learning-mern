const express = require("express");
const tasksRouter = express.Router();
const { validationResult } = require("express-validator");
const tasksController = require("../controllers/tasks.controller.js");
const { StatusCodes } = require("http-status-codes");
const {
  createTaskValidator,
  getTaskValidator,
  updateTaskValidator,
  deleteTaskValidator,
} = require("../validators/task.validator.js");
const authenticateToken = require("../middleware/authenticateToken.middleware.js");

tasksRouter.get(
  "/api/tasks",
  [getTaskValidator, authenticateToken],
  (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return tasksController.handleGetTasks(req, res);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
  }
);

tasksRouter.post(
  "/api/tasks/create",
  [createTaskValidator, authenticateToken],
  (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return tasksController.handlePostTasks(req, res);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
  }
);

tasksRouter.patch(
  "/api/tasks",
  [updateTaskValidator, authenticateToken],
  (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return tasksController.handlePatchTasks(req, res);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
  }
);

tasksRouter.delete(
  "/api/tasks",
  [deleteTaskValidator, authenticateToken],
  (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return tasksController.handleDeleteTasks(req, res);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
  }
);

module.exports = tasksRouter;
