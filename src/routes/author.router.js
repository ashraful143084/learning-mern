const express = require("express");
const { createAuthorValidator } = require("../validators/author.validator");
const { validationResult } = require("express-validator");
const { handleCreateAuthor } = require("../controllers/author.controller");
const { StatusCodes } = require("http-status-codes");
const authenticateToken = require("../middleware/authenticateToken.middleware");
const path = require("path");
const multer = require("multer");

const authorRouter = express.Router();

// File upload setup for a single file

const upload = multer({
  dest: "uploads/user",
  limits: { fileSize: 5 * 1024 * 1024 }, //max file size 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files (jpeg, jpg, png, gif) are allowed!"));
    }
  },
}).single("image");

authorRouter.post(
  "/author/create",
  [createAuthorValidator, authenticateToken],
  upload,
  (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      if (req.file) {
        req.body.image = {
          originalName: req.file.originalname,
          storedName: req.file.filename,
          path: `/uploads/user/${req.file.filename}`,
        };
      }
      return handleCreateAuthor(req, res);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
  }
);

module.exports = authorRouter;
