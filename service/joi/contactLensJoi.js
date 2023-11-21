const Joi = require("joi");

exports.contactLensesSchemaJoi = Joi.object({
  lense: Joi.object({
    Brands: Joi.string(),
    Name: Joi.string(),
    Disposability: Joi.string().valid(
      "monthly",
      "day & night",
      "daily",
      "yearly",
      "Bi-weekly"
    ),
    LenseType: Joi.string().valid("spherical", "toric", "multifocal"),
    LensPerBox: Joi.number().integer(),
    LensColor: Joi.string(),
    SubCategory: Joi.string(),
    Rating: Joi.number(),
    Stock: Joi.number().required(),
  }),
  technicalInfo: Joi.object({
    Brand: Joi.string(),
    ProductType: Joi.string().default("Contact Lens"),
    Disposability: Joi.string().valid(
      "monthly",
      "day & night",
      "daily",
      "yearly",
      "Bi-weekly"
    ),
    Country_of_Origin: Joi.string().default("india"),
    Model_No: Joi.string(),
    Base_Curve: Joi.string(),
    Diameter: Joi.string(),
    LensMaterial: Joi.string(),
    Packaging: Joi.string(),
    Usage_Duration: Joi.string(),
    Water_Content: Joi.string(),
    Gender: Joi.string().default("unisex"),
    Condition: Joi.string(),
  }),
}).options({ abortEarly: false })
