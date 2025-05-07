const { matchedData } = require("express-validator");
const Reviewer = require("../schema/reviewer.schema");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../helpers/errorLogger.helper");

const createReviewerProvider = async (req, res) => {
  const validatedData = matchedData(req);
  try {
    const existingReviewer = await Reviewer.findOne({
      reviewerEmail: validatedData.reviewerEmail,
    });

    if (existingReviewer) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "A reviewer with this email already exists",
      });
    }
    const reviewer = new Reviewer({
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      reviewerEmail: validatedData.reviewerEmail,

      institution: validatedData.institution,
      department: validatedData.department,

      preference: validatedData.preference,
      phoneNumber: validatedData.phoneNumber,
      user: req.user.sub,
    });

    await reviewer.save();

    return res.status(StatusCodes.OK).json({
      _id: reviewer._id,
      firstName: reviewer.firstName,
      lastName: reviewer.lastName,
      reviewerEmail: reviewer.reviewerEmail,

      institution: reviewer.institution,
      department: reviewer.department,

      preference: reviewer.preference,
      phoneNumber: reviewer.phoneNumber,
    });
  } catch (error) {
    errorLogger(`Error creating a new reviewer: ${error.message}`, req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason:
        "Unable to process your request at this moment, please try again later",
    });
  }
};

module.exports = { createReviewerProvider };
