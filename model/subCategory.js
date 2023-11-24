const { Schema, model } = require("mongoose");

const SubCategorySchema = new Schema({
  type: {
    type: String,
    enum: ["Color", "color", "Clear", "clear"],
  },
  CantactLensID: {
    type: Schema.Types.ObjectId,
    ref: "contact_lens",
  },
});

module.exports = model("subcategory", SubCategorySchema, "subcategory");
