const mongoose = require("mongoose");

module.exports = mongoose.model(
  "City",
  new mongoose.Schema(
    {
      _id: { type: Number, required: true },
      lat: Number,
      lng: Number,
      city: String,
      state: String,
      state_name: String,
      country: String,
    },
    { versionKey: false, timestamps: false }
  )
);
