const { matchedData } = require("express-validator");
const Author = require("../schema/author.schema");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../helpers/errorLogger.helper");

const createAuthorProvider = async (req, res) => {
  const validatedData = matchedData(req);

  try {
    const existingAuthor = await Author.findOne({
      authorEmail: validatedData.authorEmail,
    });

    if (existingAuthor) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "A user with this email already exists",
      });
    }
    const author = new Author({
      prefix: validatedData.prefix,
      firstName: validatedData.firstName,
      middleName: validatedData.middleName,
      lastName: validatedData.lastName,
      image: validatedData.image,
      authorEmail: validatedData.authorEmail,

      contributionRole: validatedData.contributionRole,
      degreeOfContribution: validatedData.degreeOfContribution,

      institutionNumber: validatedData.institutionNumber,
      institution: validatedData.institution,
      institutionTitle: validatedData.institutionTitle,
      institutionDepartment: validatedData.institutionDepartment,

      primaryAddress: validatedData.primaryAddress,
      secondaryAddress: validatedData.secondaryAddress,
      primaryAddressCountry: validatedData.primaryAddressCountry,
      primaryAddressSuite: validatedData.primaryAddressSuite,
      primaryAddressState: validatedData.primaryAddressState,
      primaryAddressCity: validatedData.primaryAddressCity,
      primaryAddressPostalCode: validatedData.primaryAddressPostalCode,
      primaryAddressPhone: validatedData.primaryAddressPhone,
      user: req.user.sub,
    });

    await author.save();

    return res.status(StatusCodes.OK).json({
      _id: author._id,
      prefix: author.prefix,
      firstName: author.firstName,
      middleName: author.middleName,
      lastName: author.lastName,
      image: author.image,
      authorEmail: author.authorEmail,

      contributionRole: author.contributionRole,
      degreeOfContribution: author.degreeOfContribution,

      institutionNumber: author.institutionNumber,
      institution: author.institution,
      institutionTitle: author.institutionTitle,
      institutionDepartment: author.institutionDepartment,

      primaryAddress: author.primaryAddress,
      secondaryAddress: author.secondaryAddress,
      primaryAddressCountry: author.primaryAddressCountry,
      primaryAddressSuite: author.primaryAddressSuite,
      primaryAddressState: author.primaryAddressState,
      primaryAddressCity: author.primaryAddressCity,
      primaryAddressPostalCode: author.primaryAddressPostalCode,
      primaryAddressPhone: author.primaryAddressPhone,
    });
  } catch (error) {
    errorLogger(`Error creating a new author: ${error.message}`, req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason:
        "Unable to process your request at this moment, please try again later",
    });
  }
};

module.exports = { createAuthorProvider };
