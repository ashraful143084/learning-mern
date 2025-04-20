const { StatusCodes } = require("http-status-codes");
const { createUserProvider } = require("../providers/user.provider");
const User = require("../schema/user.schema");

const handleCreateUser = async (req, res) => {
  const user = await createUserProvider(req, res);

  res.status(StatusCodes.OK).json(user);
};

module.exports = { handleCreateUser };
