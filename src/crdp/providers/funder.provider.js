const { matchedData } = require("express-validator");
const Funder = require("../schema/funder.schema");
const { errorLogger } = require("express-winston");
const { StatusCodes } = require("http-status-codes");

const createFunderProvider = async (req, res) => {
  const validatedData = matchedData(req);
  const funder = new Funder({ ...validatedData, user: req.user.sub });
  try {
    await funder.save();

    return res.status(StatusCodes.OK).json({
      _id: funder._id,
      name: funder.name,
      grant_1: funder.grant_1,
      grant_2: funder.grant_2,
      grant_3: funder.grant_3,
      grant_4: funder.grant_4,
      grant_5: funder.grant_5,
    });
  } catch (error) {
    errorLogger(`Error creating a new funder: ${error.message}`, req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason:
        "Unable to process your request at this moment, please try again later",
    });
  }
};

module.exports = { createFunderProvider };
