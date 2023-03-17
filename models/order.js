const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Order",
  new mongoose.Schema(
    {
      _id: { type: Number, required: true },
      user: Number,
      subtotal: Number,
      totalDiscount: Number,
      totalProducts: Number,
      totalQuantity: Number,
      total: Number,
      products: Array,
    },
    { versionKey: false }
  )
);
