const { createReviewerProvider } = require("../providers/reviewer.provider");

const handleCreateReviewer = async (req, res) => {
  return await createReviewerProvider(req, res);
};

module.exports = { handleCreateReviewer };
