const { createFunderProvider } = require("../providers/funder.provider");

const handleCreateFunder = async (req, res) => {
  return await createFunderProvider(req, res);
};

module.exports = { handleCreateFunder };
