const {
  createReviewerProvider,
  fetchReviewerProvider,
  updateReviewerProvider,
  deleteReviewerProvider,
} = require("../providers/reviewer.provider");

const handleCreateReviewer = async (req, res) => {
  return await createReviewerProvider(req, res);
};

const handleGetReviewers = async (req, res) => {
  return await fetchReviewerProvider(req, res);
};

const handleUpdateReviewer = async (req, res) => {
  return await updateReviewerProvider(req, res);
};
const handleDeleteReviewer = async (req, res) => {
  return await deleteReviewerProvider(req, res);
};

module.exports = {
  handleCreateReviewer,
  handleGetReviewers,
  handleUpdateReviewer,
  handleDeleteReviewer,
};
