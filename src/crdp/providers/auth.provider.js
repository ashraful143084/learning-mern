const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../helpers/errorLogger.helper");
const getUserByEmail = require("./getUserByEmail.provider");
const bcrypt = require("bcrypt");
const generateTokenProvider = require("./generateToken.provider");

const loginProvider = async (req, res) => {
  const validatedData = matchedData(req);
  try {
    const user = await getUserByEmail(validatedData.email);

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Email or Password Incorrect, Please check your credentials",
      });
    }

    const result = await bcrypt.compare(validatedData.password, user.password);
    if (!result) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Email or Password Incorrect, Please check your credentials",
      });
    }
    const token = generateTokenProvider(user);

    return res.status(StatusCodes.OK).json({
      accessToken: token,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (error) {
    errorLogger(`Error while login`);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason:
        "Unable to process your request at this moment, please try again later",
    });
  }
};

module.exports = { loginProvider };
