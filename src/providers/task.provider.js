const Task = require("../schema/task.schema");

const createTaskProvider = async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    priority: req.body.priority,
    dueDate: req.body.dueDate,
  });

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

module.exports = { createTaskProvider, getTaskProvider, updateTaskProvider };
