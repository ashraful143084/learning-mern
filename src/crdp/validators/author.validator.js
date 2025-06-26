const { body } = require("express-validator");
const Author = require("../schema/author.schema");

const createAuthorValidator = [
  // Prefix
  body("prefix")
    .notEmpty()
    .withMessage("Prefix is required")
    .isString()
    .withMessage("Prefix must be a string")
    .trim(),

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
      const existingAuthor = await Author.findOne({ email });
      if (existingAuthor) {
        throw new Error("An author with this email already exists");
      }
      return true;
    }),

  //google scholars
  body("googleScholars")
    .notEmpty()
    .withMessage("Google Scholars name is required")
    .isString()
    .trim(),

  // Contributions: ensure valid JSON & structure
  body("authorContribution")
    .notEmpty()
    .withMessage("Author contribution is required")
    .custom((value) => {
      let parsed;
      try {
        parsed = typeof value === "string" ? JSON.parse(value) : value;
      } catch {
        throw new Error("Invalid authorContribution JSON format");
      }

      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error("At least one Author Contribution is required");
      }

      for (const item of parsed) {
        if (
          !item.contributionRule ||
          typeof item.contributionRule !== "string"
        ) {
          throw new Error(
            "Each contribution must have a valid contributionRule"
          );
        }
        if (
          !item.degreeOfContribution ||
          typeof item.degreeOfContribution !== "string"
        ) {
          throw new Error(
            "Each contribution must have a valid degreeOfContribution"
          );
        }
      }

      return true;
    }),

  // Institution & Address Info
  body("institution")
    .notEmpty()
    .withMessage("Institution is required")
    .isString()
    .trim(),
  body("department")
    .notEmpty()
    .withMessage("Department is required")
    .isString()
    .trim(),
  body("country")
    .notEmpty()
    .withMessage("Country is required")
    .isString()
    .trim(),
  body("city").notEmpty().withMessage("City is required").isString().trim(),
  body("zipCode")
    .notEmpty()
    .withMessage("Zip Code is required")
    .isString()
    .trim(),
  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone Number is required")
    .isString()
    .trim(),
];

module.exports = { createAuthorValidator };
