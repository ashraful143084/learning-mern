const express = require("express");
const { handleCreateUser } = require("../controllers/users.controller");
const { createUserValidator } = require("../validators/user.validator");
const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const userRouter = express.Router();

// userRouter.get("/users", handleGetUser);
userRouter.post("/users/create", createUserValidator, (req, res) => {
  const result = validationResult(req);
  console.log(result);
  if (result.isEmpty()) {
    return handleCreateUser(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});
// userRouter.patch("/users", handlePatchUser);
// userRouter.delete("/users", handleDeleteUser);

module.exports = userRouter;
