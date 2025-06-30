// validators/reviewerValidator.js
const { body } = require("express-validator");
const Reviewer = require("../schema/reviewer.schema");
const Author = require("../schema/author.schema"); // Assuming you meant to check conflict with Author on update

// =========================
// Create Reviewer Validator
// =========================
const createReviewerValidator = [
  // First Name
  body("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ max: 100 })
    .withMessage("First name must be less than 100 characters")
    .isString()
    .withMessage("First name must be a string")
    .trim(),

  // Last Name
  body("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ max: 100 })
    .withMessage("Last name must be less than 100 characters")
    .isString()
    .withMessage("Last name must be a string")
    .trim(),

  // Email
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email")
    .isLength({ max: 200 })
    .withMessage("Email must be under 200 characters")
    .trim()
    .custom(async (email) => {
      const existingReviewer = await Reviewer.findOne({ email });
      if (existingReviewer) {
        throw new Error("A reviewer with this email already exists");
      }
      return true;
    }),

  // Institution
  body("institution")
    .notEmpty()
    .withMessage("Institution is required")
    .isString()
    .withMessage("Institution must be a string")
    .trim(),

  // Department
  body("department")
    .notEmpty()
    .withMessage("Department is required")
    .isString()
    .withMessage("Department must be a string")
    .trim(),

  // Phone Number
  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone number is required")
    .isString()
    .withMessage("Phone number must be a string")
    .trim(),
];

// ========================
// Update Reviewer Validator
// ========================
const updateReviewerValidator = [
  // First Name
  body("firstName")
    .optional()
    .isLength({ max: 100 })
    .withMessage("First name must be less than 100 characters")
    .isString()
    .withMessage("First name must be a string")
    .trim(),

  // Last Name
  body("lastName")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Last name must be less than 100 characters")
    .isString()
    .withMessage("Last name must be a string")
    .trim(),

  // Email
  body("email")
    .optional()
    .isEmail()
    .withMessage("Must be a valid email")
    .isLength({ max: 200 })
    .withMessage("Email must be under 200 characters")
    .trim()
    .custom(async (email, { req }) => {
      const existingReviewer = await Reviewer.findOne({ email });
      if (
        existingReviewer &&
        existingReviewer._id.toString() !== req.params.id
      ) {
        throw new Error("A reviewer with this email already exists");
      }
      return true;
    }),

  // Institution
  body("institution")
    .optional()
    .isString()
    .withMessage("Institution must be a string")
    .trim(),

  // Department
  body("department")
    .optional()
    .isString()
    .withMessage("Department must be a string")
    .trim(),

  // Phone Number
  body("phoneNumber")
    .optional()
    .isString()
    .withMessage("Phone number must be a string")
    .trim(),
];

module.exports = {
  createReviewerValidator,
  updateReviewerValidator,
};
