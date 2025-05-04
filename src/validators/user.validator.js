const { body } = require("express-validator");
const User = require("../schema/user.schema");

const createUserValidator = [
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

  body("image").isString().trim().optional(),
  body("degree", "Degree needs to be string").isString().trim().optional(),

  body("email", "Primary Email is required and must be a valid email")
    .notEmpty()
    .trim()
    .toLowerCase()
    .isEmail()
    .isLength({ max: 200 })
    .custom(async (email) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("A user with this email already exists");
      }
      return true;
    }),

  body("secondaryEmail")
    .optional({ checkFalsy: true }) // skips undefined, null, empty string
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage("Secondary Email must be a valid email")
    .isLength({ max: 200 })
    .custom(async (secondaryEmail) => {
      const existingUser = await User.findOne({ secondaryEmail });
      if (existingUser) {
        throw new Error("A user with this secondary email already exists");
      }
      return true;
    }),

  body("primaryAddress", "Primary address is required needs to be string")
    .isString()
    .trim()
    .notEmpty(),

  body("primaryAddressTitle", "Primary Address Title needs to be string")
    .isString()
    .trim()
    .optional(),

  body(
    "primaryAddressInstitution",
    "Primary Address Institution needs to be string"
  )
    .isString()
    .trim()
    .optional(),

  body(
    "primaryAddressDepartment",
    "Primary Address Department needs to be string"
  )
    .isString()
    .trim()
    .optional(),

  body("primaryAddressSuite", "Primary Address Suite needs to be string")
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

  body("primaryAddressFax", "Primary Address Fax needs to be string")
    .isString()
    .trim()
    .optional(),

  body("secondaryAddress", "Secondary Address needs to be string")
    .isString()
    .trim()
    .optional(),

  body("secondaryAddressTitle", "Secondary Address Title needs to be string")
    .isString()
    .trim()
    .optional(),

  body(
    "secondaryAddressInstitution",
    "Secondary Address Institution needs to be string"
  )
    .isString()
    .trim()
    .optional(),

  body(
    "secondaryAddressDepartment",
    "Secondary Address Department needs to be string"
  )
    .isString()
    .trim()
    .optional(),

  body("secondaryAddressSuite", "Secondary Address Suite needs to be string")
    .isString()
    .trim()
    .optional(),

  body(
    "secondaryAddressCountry",
    "Secondary Address Country needs to be string"
  )
    .isString()
    .trim()
    .optional(),

  body("secondaryAddressState", "Secondary Address State needs to be string")
    .isString()
    .trim()
    .optional(),

  body("secondaryAddressCity", "Secondary Address City needs to be string")
    .isString()
    .trim()
    .optional(),

  body(
    "secondaryAddressPostalCode",
    "Secondary Address Postal Code needs to be string"
  )
    .isString()
    .trim()
    .optional(),

  body("secondaryAddressPhone", "Secondary Address Phone needs to be string")
    .isString()
    .trim()
    .optional(),

  body("secondaryAddressFax", "Secondary Address Fax needs to be string")
    .isString()
    .trim()
    .optional(),

  body("unavailableDate", "UnavailableDate needs to be a valid ISO8601 string")
    .isString()
    .isISO8601()
    .optional(),

  body("speciality", "Speciality needs to be string")
    .isString()
    .trim()
    .optional(),

  body("externalId", "ExternalId needs to be string")
    .isString()
    .trim()
    .optional(),

  body("acceptPolicy").isBoolean().optional(),

  body(
    "password",
    "password must be minimum 8 characters included at least one number , one uppercase letter, one lowercase letter and one special characters"
  )
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/gm)
    .notEmpty()
    .trim()
    .isLength({ min: 8 }),
];

module.exports = { createUserValidator };
