const { Schema, model } = require("mongoose");

const wishlistSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    glassId: {
      type: Schema.Types.ObjectId,
      ref: "glasses",
    },
    contactLensId: {
      type: Schema.Types.ObjectId,
      ref: "contact_lens",
    },
  },
  { timestamps: true }
);

module.exports = model("wishlist", wishlistSchema, "wishlist");
