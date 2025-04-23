const { body } = require("express-validator");
const User = require("../schema/user.schema");

const createUserValidator = [
  body("firstName", "First Name is required and needs to be string")
    .notEmpty()
    .isString()
    .trim(),

  body("firstName", "First name must be less than 100 characters").isLength({
    max: 100,
  }),

  body("lastName", "Last Name is required and needs to be string")
    .optional()
    .isString()
    .trim(),

  body("lastName", "Last name must be less than 100 characters").isLength({
    max: 100,
  }),

  body("email", "Email is required and must be a valid email")
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

  ,
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
