const express = require("express");
const { createAuthorValidator } = require("../validators/author.validator");
const { validationResult } = require("express-validator");
const { handleCreateAuthor } = require("../controllers/author.controller");
const { StatusCodes } = require("http-status-codes");

const authorRouter = express.Router();

authorRouter.post("/author/create", createAuthorValidator, (req, res) => {
  const result = validationResult(req);
  console.log(result);
  if (result.isEmpty()) {
    return handleCreateAuthor(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

module.exports = authorRouter;
