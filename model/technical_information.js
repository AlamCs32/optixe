const { Schema, model } = require("mongoose");

const TechnicalInfoSchema = new Schema(
  {
    Brand: String,
    ProductType: {
      type: String,
      default: "Contact Lens",
    },
    Disposability: {
      type: String,
      enum: ["monthly", "day & night", "daily", "yearly", "Bi-weekly"],
      default: "monthly",
    },
    Country_of_Origin: {
      type: String,
      default: "india",
    },
    Model_No: String,
    Base_Curve: String,
    Diameter: String,
    LensMaterial: String,
    Packaging: String,
    Usage_Duration: String,
    Water_Content: String,
    Gender: {
      type: String,
      default: "unisex",
    },
    Condition: String,
  },
  { timestamps: true }
);

module.exports = model("technical_info", TechnicalInfoSchema, "technical_info");
