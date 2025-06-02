const express = require("express");
const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const { createReviewerValidator } = require("../validators/reviewerValidator");
const { handleCreateReviewer } = require("../controllers/reviewer.controller");
const authenticateToken = require("../middleware/authenticateToken.middleware");

const reviewerRouter = express.Router();

reviewerRouter.post(
  "/api/reviewer/create",
  [createReviewerValidator, authenticateToken],
  (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
      return handleCreateReviewer(req, res);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
  }
);

module.exports = reviewerRouter;
