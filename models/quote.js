const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Quote",
  new mongoose.Schema(
    {
      _id: { type: Number, required: true },
      quote: String,
      author: String,
    },
    { versionKey: false }
  )
);
