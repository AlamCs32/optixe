const { Schema, model } = require("mongoose");

const deliverySchema = new Schema(
  {
    OrderID: {
      type: Schema.Types.ObjectId,
      ref: "order",
    },
    DeliveryStatusUpdateUserID: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    DeliveryStatus: {
      type: String,
      enum: [
        "pending",
        "shipped",
        "out_for_delivery",
        "delivered",
        "failed",
        "return",
      ],
      default: "pending",
    },
    trackingNumber: {
      type: String,
      default: Math.floor(Math.random() * (10000000 - 99999999 + 1)) + 99999999,
    },
  },
  { timestamps: true }
);

module.exports = model("delivery", deliverySchema, "delivery");
