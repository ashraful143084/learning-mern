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

module.exports = { createAuthorProvider };
