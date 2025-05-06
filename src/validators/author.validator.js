const { body } = require("express-validator");
const User = require("../schema/user.schema");

const createAuthorValidator = [
  body("prefix", "Prefix is required").notEmpty().isString().trim(),

  body("firstName", "First name must be less than 100 characters").isLength({
    max: 100,
  }),

  body("middleName", "Middle Name is required and needs to be string")
    .optional()
    .isString()
    .trim(),

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

  body("contributionRole", "Please check Contribution Role")
    .isString()
    .trim()
    .optional(),
  body("degreeOfContribution", "Please check Degree of Contribution Role")
    .isString()
    .trim()
    .optional(),

  body("email", "Primary Email is required and must be a valid email")
    .notEmpty()
    .trim()
    .toLowerCase()
    .isEmail()
    .isLength({ max: 200 }),

  body("institutionNumber", "Institution number needs to be number")
    .isNumeric()
    .trim()
    .optional(),

  body("institution", "Institution needs to be string")
    .isString()
    .trim()
    .optional(),

  body("institutionTitle", "Institution Title needs to be string")
    .isString()
    .trim()
    .optional(),
  body("institutionDepartment", "Institution Department needs to be string")
    .isString()
    .trim()
    .optional(),

  body("primaryAddress", "Primary address is required needs to be string")
    .isString()
    .trim()
    .notEmpty(),

  body("secondaryAddress", "Secondary Address needs to be string")
    .isString()
    .trim()
    .optional(),

  body(
    "primaryAddressCountry",
    "Primary Address Country is required and needs to be string"
  )
    .isString()
    .trim()
    .notEmpty(),

  body("primaryAddressSuite", "Primary Address Suite needs to be string")
    .isString()
    .trim()
    .optional(),

  body("primaryAddressState", "Primary Address State needs to be string")
    .isString()
    .trim()
    .optional(),

  body(
    "primaryAddressCity",
    "Primary Address City is required and needs to be string"
  )
    .isString()
    .trim()
    .notEmpty(),

  body(
    "primaryAddressPostalCode",
    "Primary Address Postal Code is required and needs to be string"
  )
    .isString()
    .trim()
    .notEmpty(),

  body("primaryAddressPhone", "Primary Address Phone needs to be string")
    .isString()
    .trim()
    .optional(),
];

module.exports = { createAuthorValidator };
