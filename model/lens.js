const { Schema, model } = require("mongoose");

const lensSchema = new Schema(
  {
    Name: String,
    Price: Number,
    Vision_Type: String,
    Warranty_Period: String,
    Index_Thickness: String,
    Power_Range: String,
    Blue_Light_Blocker: Boolean,
    Anti_Scratch_Coating: Boolean,
    Both_Side_Anti_Glare_Coating: Boolean,
    Both_Side_Anti_Reflective_Coating: Boolean,
    UV_Protection: Boolean,
    Water_and_Dust_Repellent: Boolean,
    Breakage_and_Crack_Resistant: Boolean,
  },
  { timestamps: true }
);

module.exports = model("lens", lensSchema, "lens");
