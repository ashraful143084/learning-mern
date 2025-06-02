const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../helpers/errorLogger.helper.js");
const bcrypt = require("bcrypt");
const User = require("../schema/user.schema.js");

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
      prefix: validatedData.prefix,
      firstName: validatedData.firstName,
      middleName: validatedData.middleName,
      lastName: validatedData.lastName,
      image: validatedData.image,
      degree: validatedData.degree,
      email: validatedData.email,
      secondaryEmail: validatedData.secondaryEmail,
      primaryAddress: validatedData.primaryAddress,
      primaryAddressTitle: validatedData.primaryAddressTitle,
      primaryAddressInstitution: validatedData.primaryAddressInstitution,
      primaryAddressDepartment: validatedData.primaryAddressDepartment,
      primaryAddressSuite: validatedData.primaryAddressSuite,
      primaryAddressCountry: validatedData.primaryAddressCountry,
      primaryAddressState: validatedData.primaryAddressState,
      primaryAddressCity: validatedData.primaryAddressCity,
      primaryAddressPostalCode: validatedData.primaryAddressPostalCode,
      primaryAddressPhone: validatedData.primaryAddressPhone,
      primaryAddressFax: validatedData.primaryAddressFax,
      secondaryAddress: validatedData.secondaryAddress,
      secondaryAddressTitle: validatedData.secondaryAddressTitle,
      secondaryAddressInstitution: validatedData.secondaryAddressInstitution,
      secondaryAddressDepartment: validatedData.secondaryAddressDepartment,
      secondaryAddressSuite: validatedData.secondaryAddressSuite,
      secondaryAddressCountry: validatedData.secondaryAddressCountry,
      secondaryAddressState: validatedData.secondaryAddressState,
      secondaryAddressCity: validatedData.secondaryAddressCity,
      secondaryAddressPostalCode: validatedData.secondaryAddressPostalCode,
      secondaryAddressPhone: validatedData.secondaryAddressPhone,
      secondaryAddressFax: validatedData.secondaryAddressFax,
      unavailableDate: validatedData.unavailableDate,
      speciality: validatedData.speciality,
      externalId: validatedData.externalId,
      acceptPolicy: validatedData.acceptPolicy,
      password: hashedPassword,
    });

    if (req.file) {
      user.attachment = {
        path: req.file.path,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
      };
    }

    await user.save();

    return res.status(StatusCodes.OK).json({
      _id: user._id,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      image: user.image,
      degree: user.degree,
      email: user.email,
      secondaryEmail: user.secondaryEmail,
      primaryAddress: user.primaryAddress,
      primaryAddressTitle: user.primaryAddressTitle,
      primaryAddressInstitution: user.primaryAddressInstitution,
      primaryAddressDepartment: user.primaryAddressDepartment,
      primaryAddressSuite: user.primaryAddressSuite,
      primaryAddressCountry: user.primaryAddressCountry,
      primaryAddressState: user.primaryAddressState,
      primaryAddressCity: user.primaryAddressCity,
      primaryAddressPostalCode: user.primaryAddressPostalCode,
      primaryAddressPhone: user.primaryAddressPhone,
      primaryAddressFax: user.primaryAddressFax,
      secondaryAddress: user.secondaryAddress,
      secondaryAddressTitle: user.secondaryAddressTitle,
      secondaryAddressInstitution: user.secondaryAddressInstitution,
      secondaryAddressDepartment: user.secondaryAddressDepartment,
      secondaryAddressSuite: user.secondaryAddressSuite,
      secondaryAddressCountry: user.secondaryAddressCountry,
      secondaryAddressState: user.secondaryAddressState,
      secondaryAddressCity: user.secondaryAddressCity,
      secondaryAddressPostalCode: user.secondaryAddressPostalCode,
      secondaryAddressPhone: user.secondaryAddressPhone,
      secondaryAddressFax: user.secondaryAddressFax,
      unavailableDate: user.unavailableDate,
      speciality: user.speciality,
      externalId: user.externalId,
      acceptPolicy: user.acceptPolicy,
      profilePic: req.file
        ? `${req.protocol}://${req.get("host")}/${req.file.path.replace(
            /\\/g,
            "/"
          )}`
        : null,
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
