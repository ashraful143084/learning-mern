const { StatusCodes, ReasonPhrases } = require("http-status-codes");

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

const handlePostTasks = (req, res) => {
  res.send("This is post task controller");
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
