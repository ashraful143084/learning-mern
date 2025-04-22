const { matchedData } = require("express-validator");
const User = require("../schema/user.schema");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../helpers/errorLogger.helper.js");

const createUserProvider = async (req, res) => {
  const validatedData = matchedData(req);

  try {
    const user = new User({
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      password: validatedData.password,
    });
    await user.save();
    delete user.password;
    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    errorLogger(`Error creating a new user: ${error.message}`, req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason:
        "Unable to process your request at this moment, please try again later",
    });
  }
};

module.exports = { createUserProvider };
