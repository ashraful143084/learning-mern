const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../helpers/errorLogger.helper");
const Reviewer = require("../schema/reviewer.schema");

const createReviewerProvider = async (req, res) => {
  const validatedData = matchedData(req, { locations: ["body"] });

  try {
    // Check if the email already exists
    const existingAuthor = await Reviewer.findOne({
      email: validatedData.email,
    });

    if (existingAuthor) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "An Reviewer with this email already exists",
      });
    }

    const reviewer = new Reviewer({
      ...validatedData,
      user: req.user?.sub, // assuming authenticateToken sets req.user
    });

    await reviewer.save();

    return res.status(StatusCodes.CREATED).json(reviewer);
  } catch (error) {
    errorLogger(`Error creating reviewer: ${error.message}`, req, error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};

const fetchReviewerProvider = async (req, res) => {
  try {
    const reviewers = await Reviewer.find({ user: req.user.sub }); // Filter by authenticated user
    return res.status(StatusCodes.OK).json(reviewers);
  } catch (error) {
    errorLogger(`Error fetching reviewers: ${error.message}`, req, error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to fetch reviewers",
    });
  }
};

const updateReviewerProvider = async (req, res) => {
  const reviewerId = req.params.id;
  const validatedData = matchedData(req, { locations: ["body"] });

  try {
    const reviewer = await Reviewer.findById(reviewerId);

    if (!reviewer) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Reviewer not found",
      });
    }

    Object.assign(reviewer, validatedData);

    await reviewer.save();

    return res.status(StatusCodes.OK).json(reviewer);
  } catch (error) {
    errorLogger(`Error updating reviewer: ${error.message}`, req, error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to update reviewer",
    });
  }
};

const deleteReviewerProvider = async (req, res) => {
  const reviewerId = req.params.id;

  try {
    const deleted = await Reviewer.findByIdAndDelete(reviewerId);

    if (!deleted) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Reviewer not found",
      });
    }

    return res.status(StatusCodes.OK).json({
      message: "Reviewer deleted successfully",
      reviewer: deleted,
    });
  } catch (error) {
    errorLogger(`Error deleting reviewer: ${error.message}`, req, error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to delete reviewer",
    });
  }
};

module.exports = {
  createReviewerProvider,
  fetchReviewerProvider,
  updateReviewerProvider,
  deleteReviewerProvider,
};
