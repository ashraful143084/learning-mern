const { Schema, model } = require("mongoose");

const reviewerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      maxLength: [50, "First name must be 50 characters"],
    },

    lastName: {
      type: String,
      required: false,
      trim: true,
      maxLength: [50, "Last name must be 50 characters"],
    },
    reviewerEmail: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      sparse: true,
      validate: {
        validator: function (reviewerEmail) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm.test(
            reviewerEmail
          );
        },
        message: "Please enter a valid email address",
      },
    },
    institution: {
      type: String,
      required: [true, "Institution is required"],
      trim: true,
    },
    department: {
      type: String,
      required: false,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: false,
      trim: true,
    },

    preference: {
      type: String,
      required: [true, "Please check one"],
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

const Reviewer = model("Reviewer", reviewerSchema);

module.exports = Reviewer;
