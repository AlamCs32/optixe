const Joi = require("joi");

exports.lensesSchemaJoi = Joi.object({
  Name: Joi.string().required(),
  Price: Joi.number().required(),
  Vision_Type: Joi.string().required(),
  Warranty_Period: Joi.string().required(),
  Index_Thickness: Joi.string().required(),
  Power_Range: Joi.string().required(),
  Blue_Light_Blocker: Joi.boolean(),
  Anti_Scratch_Coating: Joi.boolean(),
  Both_Side_Anti_Glare_Coating: Joi.boolean(),
  Both_Side_Anti_Reflective_Coating: Joi.boolean(),
  UV_Protection: Joi.boolean(),
  Water_and_Dust_Repellent: Joi.boolean(),
  Breakage_and_Crack_Resistant: Joi.boolean(),
}).options({ abortEarly: false })
