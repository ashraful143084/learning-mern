const { matchedData } = require("express-validator");
const Author = require("../schema/author.schema");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../helpers/errorLogger.helper");

const createAuthorProvider = async (req, res) => {
  const validatedData = matchedData(req);

  try {
    const author = new Author({
      prefix: validatedData.prefix,
      firstName: validatedData.firstName,
      middleName: validatedData.middleName,
      lastName: validatedData.lastName,
      email: validatedData.email,

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
    });
    await author.save();
  } catch (error) {
    errorLogger(`Error creating a new author: ${error.message}`, req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason:
        "Unable to process your request at this moment, please try again later",
    });
  }
};

module.exports = { createAuthorProvider };
