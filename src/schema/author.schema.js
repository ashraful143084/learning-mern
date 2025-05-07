const { Schema, model } = require("mongoose");

const authorSchema = new Schema(
  {
    prefix: {
      type: String,
      required: [true, "Prefix is required"],
      trim: true,
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      maxLength: [50, "First name must be 50 characters"],
    },
    middleName: {
      type: String,
      required: false,
      trim: true,
      maxLength: [50, "Middle name must be 50 characters"],
    },
    lastName: {
      type: String,
      required: false,
      trim: true,
      maxLength: [50, "Last name must be 50 characters"],
    },
    contributionRole: {
      type: String,
      required: false,
    },
    degreeOfContribution: {
      type: String,
      required: false,
    },
    authorEmail: {
      type: String,
      required: [true, "Primary Email is required"],
      trim: true,
      unique: true,
      sparse: true,
      validate: {
        validator: function (email) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm.test(
            email
          );
        },
        message: "Please enter a valid email address",
      },
    },
    institutionNumber: {
      type: String,
      required: false,
      trim: true,
    },

    institution: {
      type: String,
      required: false,
      trim: true,
    },

    institutionTitle: {
      type: String,
      required: false,
      trim: true,
    },
    institutionDepartment: {
      type: String,
      required: false,
      trim: true,
    },

    primaryAddress: {
      type: String,
      required: [true, "Primary Address is required"],
    },
    secondaryAddress: {
      type: String,
      required: false,
    },
    primaryAddressCountry: {
      type: String,
      required: [true, "Primary address country is required"],
    },
    primaryAddressSuite: {
      type: String,
      required: false,
    },
    primaryAddressState: {
      type: String,
      required: false,
    },
    primaryAddressCity: {
      type: String,
      required: [true, "Primary address city is required"],
    },
    primaryAddressPostalCode: {
      type: String,
      required: [true, "Primary address postal code is required"],
    },
    primaryAddressPhone: {
      type: String,
      required: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Author = model("Author", authorSchema);

module.exports = Author;
