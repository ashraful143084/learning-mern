const { StatusCodes } = require("http-status-codes");
const { matchedData } = require("express-validator");
const Journal = require("../schema/journal.schema");
const errorLogger = require("../helpers/errorLogger.helper");

const createJournalProvider = async (req, res) => {
  try {
    // Validate and get sanitized data
    const validatedResult = matchedData(req);

    const journalData = {
      title: validatedResult.title,
      journalProfile: validatedResult.journalProfile,
      editorialBoard: {},
      announcement: [],
    };

    // Parse JSON arrays if sent as strings
    if (req.body.editorInChief) {
      journalData.editorialBoard.editorInChief = JSON.parse(
        req.body.editorInChief
      );
    }

    if (req.body.editors) {
      journalData.editorialBoard.editors = JSON.parse(req.body.editors);
    }

    if (req.body.announcement) {
      journalData.announcement = JSON.parse(req.body.announcement);
    }

    // Handle uploaded cover photo file (single)
    if (req.file) {
      journalData.coverPhoto = {
        path: req.file.path,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
      };
    }

    const journal = new Journal(journalData);
    await journal.save();

    return res.status(StatusCodes.CREATED).json(journal);
  } catch (error) {
    errorLogger(`Error creating a new journal: ${error.message}`, req, error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      reason:
        "Unable to process your request at this moment, please try again later",
    });
  }
};

module.exports = { createJournalProvider };
