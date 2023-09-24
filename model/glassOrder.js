const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    OrderItem: [
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
    totalAmount: String,
    paymentMethod: {
      type: String,
      enum: ['credit_card', 'debit_card', 'upi', 'cod'],
    },
  },
  { timestamps: true }
);

module.exports = model("glassOrder", orderSchema, "glassOrder");
