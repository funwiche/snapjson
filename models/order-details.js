const mongoose = require("mongoose");

module.exports = mongoose.model(
  "OrderDetail",
  new mongoose.Schema(
    {
      _id: { type: Number, required: true },
      orderId: Number,
      userId: Number,
      productId: Number,
      title: String,
      price: Number,
      quantity: Number,
      subtotal: Number,
      discount: Number,
      total: Number,
    },
    { versionKey: false }
  )
);
