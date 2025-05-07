const { body } = require("express-validator");
const Author = require("../schema/author.schema");
const Reviewer = require("../schema/reviewer.schema");

const createReviewerValidator = [
  body("firstName", "First name must be less than 100 characters").isLength({
    max: 100,
  }),

  body("middleName", "Middle name must be less than 100 characters").isLength({
    max: 100,
  }),

  body("lastName", "Last Name is required and needs to be string")
    .optional()
    .isString()
    .trim(),

  body("lastName", "Last name must be less than 100 characters").isLength({
    max: 100,
  }),

  body("reviewerEmail", "Email is required and must be a valid email")
    .notEmpty()
    .optional({ checkFalsy: true })
    .trim()
    .toLowerCase()
    .isEmail()
    .isLength({ max: 200 })
    .custom(async (reviewerEmail) => {
      const existingReviewer = await Reviewer.findOne({ reviewerEmail });
      if (existingReviewer) {
        throw new Error("A reviewer with this email already exists");
      }
      return true;
    }),

  body("institution", "Institution needs to be string")
    .isString()
    .trim()
    .notEmpty(),

  body("department", "Department Title needs to be string")
    .isString()
    .trim()
    .optional(),

  body("preference", "Preference is required").isString().trim().notEmpty(),

  body("phoneNumber", "Primary Address Phone needs to be string")
    .isString()
    .trim()
    .optional(),
];

module.exports = { createReviewerValidator };
