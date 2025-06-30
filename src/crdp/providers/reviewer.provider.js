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
  const authorId = req.params.id;
  const validatedData = matchedData(req, { locations: ["body"] });

  // Manually parse JSON fields if necessary
  if (
    validatedData.authorContribution &&
    typeof validatedData.authorContribution === "string"
  ) {
    try {
      validatedData.authorContribution = JSON.parse(
        validatedData.authorContribution
      );
    } catch (err) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Invalid JSON in authorContribution",
      });
    }
  }

  try {
    const author = await Author.findById(authorId);

    if (!author) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Author not found",
      });
    }

    Object.assign(author, validatedData);

    await author.save();

    return res.status(StatusCodes.OK).json(author);
  } catch (error) {
    errorLogger(`Error updating author: ${error.message}`, req, error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to update author",
    });
  }
};

const deleteReviewerProvider = async (req, res) => {
  const authorId = req.params.id;

  try {
    const deleted = await Author.findByIdAndDelete(authorId);

    if (!deleted) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Author not found",
      });
    }

    return res.status(StatusCodes.OK).json({
      message: "Author deleted successfully",
      author: deleted,
    });
  } catch (error) {
    errorLogger(`Error deleting author: ${error.message}`, req, error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to delete author",
    });
  }
};

module.exports = {
  createReviewerProvider,
  fetchReviewerProvider,
  updateReviewerProvider,
  deleteReviewerProvider,
};
