const { Schema, model } = require("mongoose");

// Define sub-schema for author contributions
const authorContributionSchema = new Schema(
  {
    contributionRule: {
      type: String,
      trim: true,
      required: [true, "Contribution rule is required"],
    },
    degreeOfContribution: {
      type: String,
      trim: true,
      required: [true, "Degree of contribution is required"],
    },
  },
  { _id: false } // We don't need _id for sub-docs here
);

// Define main Author schema
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
      maxlength: [50, "First name must be less than 50 characters"],
    },

    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      maxlength: [50, "Last name must be less than 50 characters"],
    },

    googleScholars: {
      type: String,
      required: [true, "Google Scholars is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      sparse: true,
      validate: {
        validator: (email) =>
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email),
        message: "Please enter a valid email address",
      },
    },

    authorContribution: {
      type: [authorContributionSchema],
      validate: [
        (val) => val.length > 0,
        "At least one author contribution is required",
      ],
    },

    institution: {
      type: String,
      required: false,
      trim: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    zipCode: {
      type: String,
      required: true,
      trim: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Create and export the model
const Author = model("Author", authorSchema);
module.exports = Author;
