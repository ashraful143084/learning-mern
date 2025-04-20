const { matchedData } = require("express-validator");
const Task = require("../schema/task.schema");
const { StatusCodes } = require("http-status-codes");

const createTaskProvider = async (req, res) => {
  const validatedResult = matchedData(req);
  const task = new Task(validatedResult);

  try {
    await task.save();
    return res.status(StatusCodes.CREATED).json(task);
  } catch (error) {
    return res
      .status(StatusCodes.GATEWAY_TIMEOUT)
      .json({
        reason:
          "Unablde to process your request at this moment, please try again later",
      });
  }
  return await task.save();
};

const getTaskProvider = async (req, res) => {
  const tasks = await Task.find();
  return tasks;
};

const updateTaskProvider = async (req, res) => {
  const task = await Task.findById(req.body["_id"]);

  task.title = req.body.title;
  task.description = req.body.description;
  task.status = req.body.status;
  task.priority = req.body.priority;
  task.dueDate = req.body.dueDate;

  return await task.save();
};

const deleteTaskProvider = async (req, res) => {
  const task = await Task.deleteOne({ _id: req.body["_id"] });
  return task;
};

module.exports = {
  createTaskProvider,
  getTaskProvider,
  updateTaskProvider,
  deleteTaskProvider,
};
