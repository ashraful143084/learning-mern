const express = require("express");
const tasksRouter = express.Router();
const tasksController = require("../controllers/tasks.controller.js");

tasksRouter.get("/tasks", tasksController.handleGetTasks);
tasksRouter.post("/tasks", tasksController.handlePostTasks);
tasksRouter.patch("/tasks", tasksController.handlePatchTasks);
tasksRouter.delete("/tasks", tasksController.handleDeleteTasks);

module.exports = tasksRouter;
