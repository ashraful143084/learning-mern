const express = require("express");
const loginController = require("../controllers/auth.controller");
const loginValidator = require("../validators/loginValidator");
const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const authRouter = express.Router();

authRouter.post("/login", loginValidator, (req, res) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return loginController.handleLogin(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

module.exports = authRouter;
