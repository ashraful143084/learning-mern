const { createUserProvider } = require("../providers/user.provider");

const handleCreateUser = async (req, res) => {
  return await createUserProvider(req, res);
};

module.exports = { handleCreateUser };
