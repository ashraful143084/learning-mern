const { body, query } = require("express-validator");

const createTaskValidator = [
  body("title", "The title cannot be empty").optional().trim(),
  // body("title", "The title must be string").isString(),
  // body("title", "The title cannot be more than 100 characters").isLength({
  //   max: 100,
  // }),
  body("title").trim(),
  body("dueDate", "Due date needs to be a valid ISO8601 string")
    .isString()
    .isISO8601()
    .optional(),
  body(
    "description",
    "The description cannot be empty and needs to be a string"
  )
    .notEmpty()
    .isString()
    .optional(),
  body(
    "description",
    "The description cannot be more than 500 characters"
  ).isLength({ max: 500 }),
  body("status").isIn(["todo", "inProgress", "completed"]).optional(),
  body("priority").isIn(["low", "normal", "high"]).optional(),
];

const getTaskValidator = [
  query("limit", "Limit must be a valid int")
    .optional()
    .isInt()
    .toInt({ min: 1 }),
  query("limit").customSanitizer((value, { req }) => {
    return value ? value : 5;
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

const updateTaskValidator = [
  body("_id", "Valid document id is required").notEmpty().isMongoId(),
  body("title", "The title must be string").isString().optional(),
  body("title", "The title cannot be more than 100 characters").isLength({
    max: 100,
  }),
  body("title").trim(),
  body("dueDate", "Due date needs to be a valid ISO8601 string")
    .isString()
    .isISO8601()
    .optional(),
  body(
    "description",
    "The description cannot be empty and needs to be a string"
  )
    .optional()
    .notEmpty()
    .isString(),
  body(
    "description",
    "The description cannot be more than 500 characters"
  ).isLength({ max: 500 }),
  body("status").isIn(["todo", "inProgress", "completed"]).optional(),
  body("priority").isIn(["low", "normal", "high"]).optional(),
];

const deleteTaskValidator = [
  body("_id", "Valid document id is required").notEmpty().isMongoId(),
];

module.exports = {
  createTaskValidator,
  getTaskValidator,
  updateTaskValidator,
  deleteTaskValidator,
};
