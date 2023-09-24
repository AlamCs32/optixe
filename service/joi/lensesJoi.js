const Joi = require("joi");

exports.lensesSchemaJoi = Joi.object({
  Name: Joi.string().required(),
  Price: Joi.number().required(),
  Vision_Type: Joi.string().required(),
  Warranty_Period: Joi.string().required(),
  Index_Thickness: Joi.string().required(),
  Power_Range: Joi.string().required(),
  Blue_Light_Blocker: Joi.boolean().default(false),
  Anti_Scratch_Coating: Joi.boolean().default(false),
  Both_Side_Anti_Glare_Coating: Joi.boolean().default(false),
  Both_Side_Anti_Reflective_Coating: Joi.boolean().default(false),
  UV_Protection: Joi.boolean().default(false),
  Water_and_Dust_Repellent: Joi.boolean().default(false),
  Breakage_and_Crack_Resistant: Joi.boolean().default(false),
});
