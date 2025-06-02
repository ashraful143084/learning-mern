const express = require("express");
const { createJournalValidator } = require("../validators/journal.validator");
const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const {
  handlePostJournal,
  handleGetJournals,
} = require("../controllers/journal.controller");
const { makeUpload } = require("../middleware/upload");
const queryParamValidator = require("../validators/queryParam.validator");

const journalRouter = express.Router();

const uploadTaskFile = makeUpload(
  (req) => `/journal`, // subDir generator
  { maxSize: 10 } // 10 MB limit (optional)
);

journalRouter.post(
  "/api/journal/create",
  [uploadTaskFile.single("coverPhoto"), createJournalValidator],
  (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return handlePostJournal(req, res);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
  }
);

journalRouter.get("/api/journals", [queryParamValidator], (req, res) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return handleGetJournals(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

module.exports = journalRouter;
