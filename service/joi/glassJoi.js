const Joi = require("joi");

exports.productSchemaJoi = Joi.object({
  Name: Joi.string().required(),
  Price: Joi.string().required(),
  Color: Joi.string().required(),
  Shape: Joi.string().required(),
  FrameType: Joi.string().required(),
  Size: Joi.string().required(),
  Gender: Joi.string().valid("Men", "Women", "Kid").required(),
  Details: Joi.string(),
  AboutLenses: Joi.string(),
  Material: Joi.string().required(),
  Dimensions: Joi.object({
    Frame_Width: Joi.string(),
    Lens_Width: Joi.string(),
    Nose_Bridge: Joi.string(),
    Temple_Length: Joi.string(),
    Frame_Height: Joi.string(),
  }),
});
