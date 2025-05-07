const { Schema, model } = require("mongoose");

const funderSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
      maxLength: [50, "First name must be 50 characters"],
    },

    grant_1: {
      type: String,
      required: false,
      trim: true,
      maxLength: [50, "Last name must be 50 characters"],
    },
    grant_2: {
      type: String,
      required: false,
      trim: true,
      maxLength: [50, "Last name must be 50 characters"],
    },
    grant_3: {
      type: String,
      required: false,
      trim: true,
      maxLength: [50, "Last name must be 50 characters"],
    },
    grant_4: {
      type: String,
      required: false,
      trim: true,
      maxLength: [50, "Last name must be 50 characters"],
    },
    grant_5: {
      type: String,
      required: false,
      trim: true,
      maxLength: [50, "Last name must be 50 characters"],
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

const Funder = model("Funder", funderSchema);

module.exports = Funder;
