const express = require("express");
const { handleCreateUser } = require("../controllers/users.controller");
const { createUserValidator } = require("../validators/user.validator");
const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const { makeUpload } = require("../middleware/upload");

const userRouter = express.Router();

const uploadUserFile = makeUpload(
  (req) => `user/`, // subDir generator
  { maxSize: 10 } // 10 MB limit (optional)
);

userRouter.post(
  "/api/users/create",
  uploadUserFile.single("profilePic"), // 🟢 Add this line to handle file uploads
  createUserValidator,
  (req, res) => {
    const result = validationResult(req);
    console.log("Uploaded File:", req.file); // 🐞 Debug uploaded file
    console.log("Validation Result", result);

    if (result.isEmpty()) {
      return handleCreateUser(req, res);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
  }
);
// userRouter.patch("/users", handlePatchUser);
// userRouter.delete("/users", handleDeleteUser);

module.exports = userRouter;
