const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Image",
  new mongoose.Schema(
    {
      _id: { type: String, required: true },
      file: String,
      mimetype: String,
    },
    { versionKey: false }
  )
);
