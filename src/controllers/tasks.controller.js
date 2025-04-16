const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { createTaskProvider } = require("../providers/task.provider");

const handleGetTasks = (req, res) => {
  let response = [
    {
      title: "Task Title 1",
      description: "This is the description of this tasks",
      priority: "high",
      status: "todo",
    },
    {
      title: "Task Title 2",
      description: "This is the description of this tasks",
      priority: "high",
      status: "todo",
    },
    {
      title: "Task Title 3",
      description: "This is the description of this tasks",
      priority: "high",
      status: "todo",
    },
  ];

  res.status(StatusCodes.OK).json(response);
};

const handlePostTasks = async (req, res) => {
  const task = await createTaskProvider(req, res);
  res.status(StatusCodes.CREATED).json(task);
};

const handlePatchTasks = (req, res) => {
  res.send("This is patch task controller");
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
