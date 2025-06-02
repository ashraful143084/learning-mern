const { matchedData } = require("express-validator");
const Task = require("../schema/task.schema");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../helpers/errorLogger.helper");

const createTaskProvider = async (req, res) => {
  try {
    const validatedResult = matchedData(req);
    const taskData = {
      ...validatedResult,
      user: req.user.sub,
    };

    // Add file path if file was uploaded
    if (req.file) {
      taskData.attachment = {
        path: req.file.path,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
      };
    }

    const task = new Task(taskData);
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
    const order = query.order;
    const totalPages = Math.ceil(totalTask / limit);
    const nextPage = currentPage === totalPages ? currentPage : currentPage + 1;
    const previousPage = currentPage === 1 ? currentPage : currentPage - 1;

    const baseURL = `${req.protocol}://${req.get("host")}${
      req.originalUrl.split("?")[0]
    }`;

    const tasks = await Task.find({
      status: { $in: ["todo", "inProgress"] },
    })
      .limit(limit)
      .skip(currentPage - 1)
      .sort({
        createdAt: order === "asc" ? 1 : -1,
      });

    let finalResponse = {
      data: tasks,
      pagination: {
        meta: {
          itemsPerPage: limit,
          totalItems: totalTask,
          currentPage: currentPage,
          totalPages: totalPages,
        },
        links: {
          first: `${baseURL}/?limit=${limit}&page=${1}&order=${order}`,
          last: `${baseURL}/?limit=${limit}&page=${totalPages}&order=${order}`,
          current: `${baseURL}/?limit=${limit}&page=${currentPage}&order=${order}`,
          next: `${baseURL}/?limit=${limit}&page=${nextPage}&order=${order}`,
          previous: `${baseURL}/?limit=${limit}&page=${previousPage}&order=${order}`,
        },
      },
    };
    return res.status(StatusCodes.OK).json(finalResponse);
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
