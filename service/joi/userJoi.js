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
exports.singupJoi = (body) => {
  let schema = joi.object({
    username: joi.string().messages(customMessage("username")).required(),
    email: joi.string().email().messages(customMessage("email")).required(),
    password: joi.string().messages(customMessage("password")).required(),
    phoneNo: joi.number().min(10).required(),
    address: joi.array().string(),
  });
  let { error } = schema.validate(body, { abortEarly: false });
  console.log({ error });
  return error ? error : false;
};

exports.loginJoi = (body) => {
  let schema = joi.object({
    email: joi.string().email().messages(customMessage("email")).required(),
    password: joi.string().messages(customMessage("password")).required(),
  });
  let { error } = schema.validate(body, { abortEarly: false });
  return error ? error : false;
};

exports.changePasswordJoi = (body) => {
  let schema = joi.object({
    password: joi.string().messages(customMessage("password")).required(),
    old_password: joi
      .string()
      .messages(customMessage("old_password"))
      .required(),
  });
  let { error } = schema.validate(body, { abortEarly: false });
  return error ? error : false;
};

exports.emailJoi = (body) => {
  let schema = joi.object({
    email: joi.string().email().messages(customMessage("email")).required(),
  });
  let { error } = schema.validate(body, { abortEarly: false });
  return error ? error : false;
};

exports.resetPasswordJoi = (body) => {
  let schema = joi.object({
    id: joi.string().messages(customMessage("id")).required(),
    token: joi.string().messages(customMessage("token")).required(),
    password: joi.string().messages(customMessage("password")).required(),
  });
  let { error } = schema.validate(body, { abortEarly: false });
  return error ? error : false;
};

// User Profile

exports.updateProfileJoi = (body) => {
  let schema = joi.object({
    username: joi.string().messages(customMessage("username")).required(),
    address: joi.string(),
  });
  let { error } = schema.validate(body, { abortEarly: false });
  return error ? error : false;
};

// End User joi Validation
