const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Post",
  new mongoose.Schema(
    {
      _id: { type: Number, required: true },
      title: String,
      category: String,
      body: String,
      tags: Array,
      user: Number,
      likes: Number,
    },
    { versionKey: false }
  )
);
