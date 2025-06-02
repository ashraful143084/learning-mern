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
      slug: validatedResult.slug,
      volume: validatedResult.volume,
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
      const filePath = req.file.path.split("uploads")[1].replace(/\\/g, "/"); // safe, relative path
      const baseUrl = `${req.protocol}://${req.get("host")}`; // http://localhost:3001
      const fullUrl = `${baseUrl}/uploads${filePath}`;

      journalData.coverPhoto = {
        path: fullUrl,
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

const fetchJournalProvider = async (req, res) => {
  const query = matchedData(req);

  try {
    const totalTask = await Journal.countDocuments();
    const limit = query.limit;
    const currentPage = query.page;
    const order = query.order;
    const totalPages = Math.ceil(totalTask / limit);
    const nextPage = currentPage === totalPages ? currentPage : currentPage + 1;
    const previousPage = currentPage === 1 ? currentPage : currentPage - 1;

    const baseURL = `${req.protocol}://${req.get("host")}${
      req.originalUrl.split("?")[0]
    }`;

    const journals = await Journal.find()
      .limit(limit)
      .skip(currentPage - 1)
      .sort({
        createdAt: order === "asc" ? 1 : -1,
      });

    let finalResponse = {
      data: journals,
      pagination: {
        meta: {
          itemsPerPage: limit,
          totalItems: totalTask,
          currentPage: currentPage,
          totalPages: totalPages,
        },
        links: {
          first: `${baseURL}/?limit=${limit}&page=${1}&order=${order}`,
          last: `${baseURL}/?limit=${limit}&page=${totalPages}&order=${order}`,
          current: `${baseURL}/?limit=${limit}&page=${currentPage}&order=${order}`,
          next: `${baseURL}/?limit=${limit}&page=${nextPage}&order=${order}`,
          previous: `${baseURL}/?limit=${limit}&page=${previousPage}&order=${order}`,
        },
      },
    };
    return res.status(StatusCodes.OK).json(finalResponse);
  } catch (error) {
    errorLogger(`Error while fetching data`, req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason:
        "Unable to process your request at this moment, please try again later",
    });
  }
};

module.exports = { createJournalProvider, fetchJournalProvider };
