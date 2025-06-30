const { matchedData } = require("express-validator");
const Author = require("../schema/author.schema");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../helpers/errorLogger.helper");

const createAuthorProvider = async (req, res) => {
  const validatedData = matchedData(req, { locations: ["body"] });

  try {
    // Check if the email already exists
    const existingAuthor = await Author.findOne({
      email: validatedData.email,
    });

    if (existingAuthor) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "An author with this email already exists",
      });
    }

    // Parse authorContribution
    let authorContribution = [];
    if (req.body.authorContribution) {
      try {
        authorContribution = JSON.parse(req.body.authorContribution);
      } catch (e) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Invalid format for authorContribution",
        });
      }
    }

    const author = new Author({
      ...validatedData,
      authorContribution,
      user: req.user?.sub, // assuming authenticateToken sets req.user
    });

    await author.save();

    return res.status(StatusCodes.CREATED).json(author);
  } catch (error) {
    errorLogger(`Error creating author: ${error.message}`, req, error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};

const fetchAuthorProvider = async (req, res) => {
  try {
    const authors = await Author.find({ user: req.user.sub }); // Filter by authenticated user
    return res.status(StatusCodes.OK).json(authors);
  } catch (error) {
    errorLogger(`Error fetching authors: ${error.message}`, req, error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to fetch authors",
    });
  }
};

const updateAuthorProvider = async (req, res) => {
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

const deleteAuthorProvider = async (req, res) => {
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
  createAuthorProvider,
  fetchAuthorProvider,
  updateAuthorProvider,
  deleteAuthorProvider,
};
