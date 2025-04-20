const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const {
  createTaskProvider,
  getTaskProvider,
  updateTaskProvider,
  deleteTaskProvider,
} = require("../providers/task.provider");

const handleGetTasks = async (req, res) => {
  const tasks = await getTaskProvider(req, res);
  res.status(StatusCodes.OK).json(tasks);
};

const handlePostTasks = async (req, res) => {
  return await createTaskProvider(req, res);
};

const handlePatchTasks = async (req, res) => {
  const updatedTask = await updateTaskProvider(req, res);

  res.status(StatusCodes.OK).json(updatedTask);
};

const handleDeleteTasks = async (req, res) => {
  const deletedTask = await deleteTaskProvider(req, res);

  res.status(StatusCodes.OK).json(deletedTask);
};

module.exports = {
  handleGetTasks,
  handlePostTasks,
  handlePatchTasks,
  handleDeleteTasks,
};
