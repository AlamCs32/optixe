const Joi = require('joi');

// Define Joi schema for OrderItem
const orderItemSchema = Joi.object().keys({
    GlassID: Joi.string(),
    lenseID: Joi.string(),
    Quantity: Joi.number().required(),
    Price: Joi.number().required(),
}).options({ abortEarly: false })

// Define Joi schema for Order
exports.orderJoiSchema = Joi.object().keys({
    OrderItem: Joi.array().items(orderItemSchema),
    shippingAddress: Joi.string().required(),
    totalAmount: Joi.number().required(),
}).options({ abortEarly: false })

