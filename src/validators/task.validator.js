const { body } = require("express-validator");

const createTaskValidator = [
  body("title", "The title cannot be empty").notEmpty(),
  body("title", "The title must be string").isString(),
  body("title", "The title cannot be more than 100 characters").isLength({
    max: 100,
  }),
  body("title").trim(),
  body("dueDate", "Due date needs to be a valid ISO8601 string")
    .isString()
    .isISO8601(),
  body(
    "description",
    "The description cannot be empty and needs to be a string"
  )
    .notEmpty()
    .isString(),
  body(
    "description",
    "The description cannot be more than 500 characters"
  ).isLength({ max: 500 }),
  body("status").isIn(["todo", "inProgress", "completed"]),
  body("priority").isIn(["low", "normal", "high"]),
];

module.exports = { createTaskValidator };
