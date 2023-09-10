const { Order, OrderItem, Delivery, Payment } = require("../model");

exports.createOrder = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Order is Created",
    });
  } catch (error) {
    return next(error);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Order is Created",
    });
  } catch (error) {
    return next(error);
  }
};

exports.getOrderDetails = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Order is Created",
    });
  } catch (error) {
    return next(error);
  }
};

exports.cancleOrder = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Order is Created",
    });
  } catch (error) {
    return next(error);
  }
};
