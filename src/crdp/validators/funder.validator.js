const { body } = require("express-validator");
const Reviewer = require("../schema/reviewer.schema");

const createFunderValidator = [
  body("name", "Name must be less than 100 characters").isLength({
    max: 100,
  }),

  body("grant_1", "Grant must be less than 100 characters").isLength({
    max: 100,
  }),

  body("grant_2", "Grant must be less than 100 characters").isLength({
    max: 100,
  }),

  body("grant_3", "Grant must be less than 100 characters").isLength({
    max: 100,
  }),
  body("grant_4", "Grant must be less than 100 characters").isLength({
    max: 100,
  }),
  body("grant_5", "Grant must be less than 100 characters").isLength({
    max: 100,
  }),
];

module.exports = { createFunderValidator };
