const express = require("express");
const { handleLogin } = require("../controllers/auth.controller");
const authRouter = express.Router();

authRouter.post("/login", handleLogin);

module.exports = authRouter;
