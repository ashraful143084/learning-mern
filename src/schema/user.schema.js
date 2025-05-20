const { Schema, model } = require("mongoose");

const userSchema = new Schema(
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
    image: {
      type: String,
      required: false,
    },
    degree: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: [true, "Primary Email is required"],
      trim: true,
      unique: true,
      validate: {
        validator: function (email) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm.test(
            email
          );
        },
        message: "Please enter a valid email address",
      },
    },
    secondaryEmail: {
      type: String,
      required: false,
      trim: true,
      unique: true,
      sparse: true,
      validate: {
        validator: function (secondaryEmail) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm.test(
            secondaryEmail
          );
        },
        message: "Please enter a valid email address",
      },
    },
    primaryAddress: {
      type: String,
      required: [true, "Primary Address is required"],
    },
    primaryAddressTitle: {
      type: String,
      required: false,
    },
    primaryAddressInstitution: {
      type: String,
      required: false,
    },
    primaryAddressDepartment: {
      type: String,
      required: false,
    },
    primaryAddressSuite: {
      type: String,
      required: false,
    },
    primaryAddressCountry: {
      type: String,
      required: [true, "Primary address country is required"],
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
    primaryAddressFax: {
      type: String,
      required: false,
    },
    secondaryAddress: {
      type: String,
      required: false,
    },
    secondaryAddressTitle: {
      type: String,
      required: false,
    },
    secondaryAddressInstitution: {
      type: String,
      required: false,
    },
    secondaryAddressDepartment: {
      type: String,
      required: false,
    },
    secondaryAddressSuite: {
      type: String,
      required: false,
    },
    secondaryAddressCountry: {
      type: String,
      required: false,
    },
    secondaryAddressState: {
      type: String,
      required: false,
    },
    secondaryAddressCity: {
      type: String,
      required: false,
    },
    secondaryAddressPostalCode: {
      type: String,
      required: false,
    },
    secondaryAddressPhone: {
      type: String,
      required: false,
    },
    secondaryAddressFax: {
      type: String,
      required: false,
    },
    unavailableDate: {
      type: String,
      required: false,
    },
    speciality: {
      type: String,
      required: false,
    },
    externalId: {
      type: String,
      required: false,
    },
    acceptPolicy: {
      type: Boolean,
      required: false,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    attachment: {
      path: String,
      originalName: String,
      mimetype: String,
      size: Number,
    },
  },
  { timestamps: true, versionKey: false }
);

const User = model("User", userSchema);

module.exports = User;
