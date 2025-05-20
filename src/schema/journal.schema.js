const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const personSchema = new Schema(
  {
    name: { type: String, trim: true },
    designation: { type: String, trim: true },
  },
  { _id: false }
);

const announcementSchema = new Schema(
  {
    title: { type: String, trim: true },
    date: { type: Date },
  },
  { _id: false }
);

const coverPhotoSchema = new Schema(
  {
    path: String,
    originalName: String,
    mimetype: String,
    size: Number,
  },
  { _id: false }
);

const journalSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    coverPhoto: coverPhotoSchema, // single embedded document
    journalProfile: {
      type: String,
      required: [true, "Journal Profile is required"],
      trim: true,
    },
    editorialBoard: {
      editorInChief: [personSchema],
      editors: [personSchema],
    },
    announcement: [announcementSchema],
  },
  { timestamps: true }
);

const Journal = model("Journal", journalSchema);

module.exports = Journal;
