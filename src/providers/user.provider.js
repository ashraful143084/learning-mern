const { matchedData } = require("express-validator");
const User = require("../schema/user.schema");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../helpers/errorLogger.helper.js");
const bcrypt = require("bcrypt");

const createUserProvider = async (req, res) => {
  const validatedData = matchedData(req);

  try {
    const existingUser = await User.findOne({ email: validatedData.email });

    if (existingUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "A user with this email already exists",
      });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(validatedData.password, salt);

    const user = new User({
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      password: hashedPassword,
    });
    await user.save();
    return res.status(StatusCodes.OK).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (error) {
    errorLogger(`Error creating a new user: ${error.message}`, req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason:
        "Unable to process your request at this moment, please try again later",
    });
  }
};

module.exports = { createUserProvider };
