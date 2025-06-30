const {
  createAuthorProvider,
  fetchAuthorProvider,
  updateAuthorProvider,
  deleteAuthorProvider,
} = require("../providers/author.provider");

const handleCreateAuthor = async (req, res) => {
  return await createAuthorProvider(req, res);
};

const handleGetAuthors = async (req, res) => {
  return await fetchAuthorProvider(req, res);
};

const handleUpdateAuthor = async (req, res) => {
  return await updateAuthorProvider(req, res);
};
const handleDeleteAuthor = async (req, res) => {
  return await deleteAuthorProvider(req, res);
};

module.exports = {
  handleCreateAuthor,
  handleGetAuthors,
  handleUpdateAuthor,
  handleDeleteAuthor,
};
