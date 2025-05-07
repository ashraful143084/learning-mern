const express = require("express");
const { createFunderValidator } = require("../validators/funder.validator");
const { handleCreateFunder } = require("../controllers/funder.controller");
const authenticateToken = require("../middleware/authenticateToken.middleware");
const { validationResult } = require("express-validator");

const funderRouter = express.Router();

funderRouter.post(
  "/funder/create",
  [createFunderValidator, authenticateToken],
  (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
      return handleCreateFunder(req, res);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
  }
);

module.exports = funderRouter;
