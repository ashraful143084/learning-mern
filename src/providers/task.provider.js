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

module.exports = { createTaskProvider };
