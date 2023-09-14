const { Schema, model } = require("mongoose");

const SubCategorySchema = new Schema({
  type: {
    type: String,
    enum: ["Color", "Clear"],
  },
  CantactLensID: {
    type: Schema.Types.ObjectId,
    ref: "contact_lens",
  },
});

module.exports = model("subcategory", SubCategorySchema, "subcategory");
