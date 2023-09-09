const { Schema, model } = require("mongoose");

const glassesSchema = new Schema(
  {
    Name: String,
    Price: Number,
    Color: String,
    Shape: String,
    FrameType: String,
    Size: String,
    Gender: {
      type: String,
      enum: ["Men", "Women", "Kid"],
    },
    Images: [String],
    Details: String,
    AboutLenses: String,
    Material: String,
    Dimensions: {
      Frame_Width: String,
      Lens_Width: String,
      Nose_Bridge: String,
      Temple_Length: String,
      Frame_Height: String,
    },
  },
  { timestamps: true }
);

module.exports = model("glasses", glassesSchema, "glasses");
