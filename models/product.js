const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Product",
  new mongoose.Schema(
    {
      _id: { type: Number, required: true },
      title: String,
      description: String,
      price: Number,
      salesPrice: Number,
      rating: Number,
      brand: String,
      stock: Number,
      category: String,
      thumbnail: String,
      gallery: Array,
    },
    { versionKey: false }
  )
);
