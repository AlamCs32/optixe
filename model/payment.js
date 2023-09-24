const { Schema, model } = require("mongoose");

const PaymentSchema = new Schema(
  {
    OrderID: {
      type: Schema.Types.ObjectId,
      ref: "order",
    },
    amount: Number,
    method: String,
    PaymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = model("payment", PaymentSchema, "payment");
