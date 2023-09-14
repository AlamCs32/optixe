const { Schema, model } = require("mongoose");

const contactLensesSchema = new Schema(
  {
    Brands: String,
    Name: String,
    Disposability: {
      type: String,
      enum: ["monthly", "day & night", "daily", "yearly", "Bi-weekly"],
      default: "monthly",
    },
    LenseType: {
      type: String,
      enum: ["spherical", "toric", "multifocal"],
    },
    LensPerBox: Number,
    LensColor: String,
    SubCategory: String,
    Rating: {
      type: Number,
      default: 0,
    },
    Stock: {
      type: Number,
      default: 0,
    },
    TechnicalInfoID: {
      type: Schema.Types.ObjectId,
      ref: "technical_info",
    },
  },
  { timestamps: true }
);

module.exports = model("contact_lens", contactLensesSchema, "contact_lens");
