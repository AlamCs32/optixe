const Joi = require("joi");

exports.wishlistJoiSchema = Joi.object({
  glassId: Joi.string(), // Assuming glassId is a string
  contactLensId: Joi.string(), // Assuming contactLensId is a string
}).options({ abortEarly: false })
