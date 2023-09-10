const { Schema, model } = require("mongoose");

const OrderItemSchema = new Schema(
  {
    GlassID: {
      type: Schema.Types.ObjectId,
      ref: "glasses",
    },
    lenseID: {
      type: Schema.Types.ObjectId,
      ref: "lens",
    },
    Quantity: {
      type: Number,
      default: 1,
    },
    Price: Number,
  },
  { timestamps: true }
);

module.exports = model("order_item", OrderItemSchema, "order_item");
