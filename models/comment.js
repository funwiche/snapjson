const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Comment",
  new mongoose.Schema(
    {
      _id: { type: Number, required: true },
      body: String,
      post: Number,
      user: Number,
    },
    { versionKey: false }
  )
);
