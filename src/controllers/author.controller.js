const { createAuthorProvider } = require("../providers/author.provider");

const handleCreateAuthor = async (req, res) => {
  return await createAuthorProvider(req, res);
};

module.exports = { handleCreateAuthor };
