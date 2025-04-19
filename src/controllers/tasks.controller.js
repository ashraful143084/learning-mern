const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const {
  createTaskProvider,
  getTaskProvider,
  updateTaskProvider,
} = require("../providers/task.provider");

const handleGetTasks = async (req, res) => {
  const tasks = await getTaskProvider(req, res);
  res.status(StatusCodes.OK).json(tasks);
};

const handlePostTasks = async (req, res) => {
  const task = await createTaskProvider(req, res);
  res.status(StatusCodes.CREATED).json(task);
};

const handlePatchTasks = async (req, res) => {
  const updatedTask = await updateTaskProvider(req, res);

  res.status(StatusCodes.OK).json(updatedTask);
};

const handleDeleteTasks = (req, res) => {
  res.send("This is delete task controller");
};

module.exports = {
  handleGetTasks,
  handlePostTasks,
  handlePatchTasks,
  handleDeleteTasks,
};
