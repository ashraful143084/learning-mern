const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema(
  {
    originalName: String,
    storedName: String,
    path: String,
  },
  { _id: false }
);

module.exports = { FileSchema };
