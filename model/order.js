const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    OrderItem: [
      {
        type: Schema.Types.ObjectId,
        ref: "order_item",
      },
    ],
    UserID: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    OrdedStatus: {
      type: String,
      enum: ["pending", "processing", "completed", "cancelled"],
      default: "pending",
    },
    shippingAddress: String,
    totalAmount: Number,
    paymentMethod: {
      type: String,
      enum: ["credit card", "debid card", "upi", "cash on delivery"],
    },
  },
  { timestamps: true }
);

module.exports = model("order", orderSchema, "order");
