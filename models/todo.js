const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Todo",
  new mongoose.Schema(
    {
      _id: { type: Number, required: true },
      todo: String,
      completed: Boolean,
      user: Number,
    },
    { versionKey: false }
  )
);
