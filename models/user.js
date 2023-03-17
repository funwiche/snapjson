const mongoose = require("mongoose");

module.exports = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      _id: { type: Number, required: true },
      username: { type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true },
      name: String,
      phone: String,
      avatar: String,
      password: String,
      address: Map,
    },
    { versionKey: false }
  )
);
