const joi = require("joi");

// For Custom Error Message is Joi
function customMessage(fieldName) {
  return {
    "string.base": `${fieldName} should be a type of 'text'`,
    "string.empty": `${fieldName} cannot be an empty field`,
    "string.min": `${fieldName} should have a minimum length of `,
    "any.required": `${fieldName} is a required field`,
    "number.min": `${fieldName} should have a minimum length of 10`,
    "number.max": `${fieldName} should have a maximum length of 15`,
  };
}

// User joi Validation
exports.singupJoi = joi.object({
  username: joi.string().messages(customMessage("username")).required(),
  email: joi.string().email().messages(customMessage("email")).required(),
  password: joi.string().messages(customMessage("password")).required(),
  phoneNo: joi.number().min(10).required(),
  address: joi.array(),
}).options({ abortEarly: false });

exports.loginJoi = joi.object({
  email: joi.string().email().messages(customMessage("email")).required(),
  password: joi.string().messages(customMessage("password")).required(),
}).options({ abortEarly: false })

exports.changePasswordJoi = joi.object({
  password: joi.string().messages(customMessage("password")).required(),
  old_password: joi
    .string()
    .messages(customMessage("old_password"))
    .required(),
}).options({ abortEarly: false })

exports.emailJoi = joi.object({
  email: joi.string().email().messages(customMessage("email")).required(),
});

exports.resetPasswordJoi = joi.object({
  id: joi.string().messages(customMessage("id")).required(),
  token: joi.string().messages(customMessage("token")).required(),
  password: joi.string().messages(customMessage("password")).required(),
}).options({ abortEarly: false })

// User Profile

exports.updateProfileJoi = joi.object({
  username: joi.string().messages(customMessage("username")).required(),
  address: joi.string(),
}).options({ abortEarly: false })

// End User joi Validation
