const express = require("express");
const multer = require("multer");
const { validationResult } = require("express-validator");

const authenticateToken = require("../middleware/authenticateToken.middleware");
const {
  createReviewerValidator,
  updateReviewerValidator,
} = require("../validators/reviewer.validator");
const {
  handleCreateReviewer,
  handleGetReviewers,
  handleUpdateReviewer,
  handleDeleteReviewer,
} = require("../controllers/reviewer.controller");

const reviewerRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // or use diskStorage

reviewerRouter.post(
  "/api/reviewer/create",
  [authenticateToken, upload.none(), ...createReviewerValidator],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return handleCreateReviewer(req, res);
  }
);

reviewerRouter.get("/api/reviewers", authenticateToken, (req, res) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return handleGetReviewers(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

reviewerRouter.put(
  "/api/reviewer/update/:id",
  authenticateToken,
  upload.none(), // ← MUST be here
  ...updateReviewerValidator,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    handleUpdateReviewer(req, res);
  }
);

reviewerRouter.delete(
  "/api/reviewer/delete/:id",
  authenticateToken,
  (req, res) => {
    handleDeleteReviewer(req, res);
  }
);

module.exports = reviewerRouter;
