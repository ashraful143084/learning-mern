const {
  createAuthorProvider,
  fetchAuthorProvider,
} = require("../providers/author.provider");

const handleCreateAuthor = async (req, res) => {
  return await createAuthorProvider(req, res);
};

const handleGetAuthors = async (req, res) => {
  return await fetchAuthorProvider(req, res);
};

module.exports = { handleCreateAuthor, handleGetAuthors };
