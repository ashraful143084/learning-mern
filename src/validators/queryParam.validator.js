const { body, query } = require("express-validator");

const queryParamValidator = [
  query("limit", "Limit must be a valid int")
    .optional()
    .isInt()
    .toInt({ min: 1 }),
  query("limit").customSanitizer((value, { req }) => {
    return value ? value : 10;
  }),
  query("page", "Page must be a valid int")
    .optional()
    .isInt()
    .toInt({ min: 1 }),
  query("page").customSanitizer((value, { req }) => {
    return value ? value : 1;
  }),
  query("order", "Order must be one of ['asc','dsc']")
    .optional()
    .isIn(["asc", "dsc"]),
  query("order").customSanitizer((value, { req }) => {
    return value ? value : "asc";
  }),
];

module.exports = queryParamValidator;
