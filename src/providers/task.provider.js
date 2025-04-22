const { matchedData } = require("express-validator");
const Task = require("../schema/task.schema");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../helpers/errorLogger.helper");

const createTaskProvider = async (req, res) => {
  const validatedResult = matchedData(req);
  const task = new Task(validatedResult);

  try {
    await task.save();
    return res.status(StatusCodes.CREATED).json(task);
  } catch (error) {
    errorLogger(`Error creating a new task: ${error.message}`, req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason:
        "Unable to process your request at this moment, please try again later",
    });
  }
};

const getTaskProvider = async (req, res) => {
  const query = matchedData(req);

  try {
    const totalTask = await Task.countDocuments();
    const limit = query.limit;
    const currentPage = query.page;
    const totalPage = Math.ceil(totalTask / limit);

    console.log(totalTask, limit, currentPage, totalPage);

    const tasks = await Task.find();
    return res.status(StatusCodes.OK).json(tasks);
  } catch (error) {
    errorLogger(`Error while fetching data`, req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason:
        "Unable to process your request at this moment, please try again later",
    });
  }
};

const updateTaskProvider = async (req, res) => {
  const validatedData = matchedData(req);
  try {
    const task = await Task.findById(req.body["_id"]);

    task.title = validatedData.title || task.title;
    task.description = validatedData.description || task.description;
    task.status = validatedData.status || task.status;
    task.priority = validatedData.priority || task.priority;
    task.dueDate = validatedData.dueDate || task.dueDate;
    const updatedTask = await task.save();

    return res.status(StatusCodes.OK).json(updatedTask);
  } catch (error) {
    errorLogger(`Error while updating data`, req, error);
    res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason:
        "Unable to process your request at this moment, please try again later",
    });
  }
};

const deleteTaskProvider = async (req, res) => {
  const validatedData = matchedData(req);

  try {
    const task = await Task.deleteOne({ _id: validatedData["_id"] });
    return res.status(StatusCodes.OK).json(task);
  } catch (error) {
    errorLogger(`Error while deleting task`, req, error);
    res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason:
        "Unable to process your request at this moment, please try again later",
    });
  }
};

module.exports = {
  createTaskProvider,
  getTaskProvider,
  updateTaskProvider,
  deleteTaskProvider,
};
