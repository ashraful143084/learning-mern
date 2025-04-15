const express = require("express");
const { handleCreateUser } = require("../controllers/users.controller");

const userRouter = express.Router();

userRouter.post("/users", handleCreateUser);

module.exports = userRouter;
