const express = require("express");
const { handleCreateUser } = require("../controllers/users.controller");

const userRouter = express.Router();

// userRouter.get("/users", handleGetUser);
userRouter.post("/users", handleCreateUser);
// userRouter.patch("/users", handlePatchUser);
// userRouter.delete("/users", handleDeleteUser);

module.exports = userRouter;
