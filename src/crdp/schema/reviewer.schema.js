const { Schema, model } = require("mongoose");

const reviewerSchema = new Schema(
  {
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

const Reviewer = model("Reviewer", reviewerSchema);

module.exports = Reviewer;
