const express = require("express");
const multer = require("multer");
const { createAuthorValidator } = require("../validators/author.validator");
const { validationResult } = require("express-validator");
const {
  handleCreateAuthor,
  handleGetAuthors,
} = require("../controllers/author.controller");
const authenticateToken = require("../middleware/authenticateToken.middleware");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // or use diskStorage

router.post(
  "/api/author/create",
  [authenticateToken, upload.none(), ...createAuthorValidator],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log("✅ Incoming data:", req.body);
    return handleCreateAuthor(req, res);
  }
);

router.get("/api/authors", authenticateToken, (req, res) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return handleGetAuthors(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

module.exports = router;
