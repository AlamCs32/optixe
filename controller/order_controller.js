const { GlassOrder, OrderItem, Delivery, Payment, Glasses } = require("../model");
const { orderJoiSchema } = require("../service/joi/orderJoi");
const mongoose = require("mongoose")

exports.createGlassOrder = async (req, res, next) => {
  let session = await mongoose.startSession()
  try {

    await orderJoiSchema.validateAsync(req.body, { abortEarly: false, })
    session.startTransaction()
    req.body.UserID = req.user._id
    let ids = req.body.OrderItem.map(i => i.GlassID)
    let glasse = await Glasses.find({ _id: ids }).select("Stock Price")

    let ammount = 0

    for (let i in glasse) {
      if (glasse[i].Stock < req.body.OrderItem[i].Quantity) {
        return next(Error("Out Of Stock"))
      }
      ammount += req.body.OrderItem[i].Price * req.body.OrderItem[i].Quantity
    }

    if (ammount !== req.body.totalAmount) {
      return next(Error("Ammount is Not Correct"))
    }

    let order = await GlassOrder.create(req.body)

    await Delivery.create({
      OrderID: order._id
    })

    await Payment.create({
      OrderID: order._id,
      amount: ammount,
    })

    for (let i in ids) {
      let Stock = glasse[i].Stock - req.body.OrderItem[i].Quantity
      await Glasses.findByIdAndUpdate(ids[i], {
        Stock
      })
    }

    await session.commitTransaction()
    session.endSession()

    return res.status(200).json({
      success: true,
      message: "Order is Created",
      data: order
    });
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    return next(error);
  }
};

exports.getGlassOrder = async (req, res, next) => {
  try {

    let order = await GlassOrder.find({
      UserID: req.user._id
    }).populate("OrderItem.GlassID")

    return res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    return next(error);
  }
};

exports.getOrderGlassDetails = async (req, res, next) => {
  try {
    const orderPromise = GlassOrder.findOne({ _id: req.params.id }).populate('OrderItem.GlassID');
    const deliveryPromise = Delivery.findOne({ OrderID: req.params.id });
    const paymentPromise = Payment.findOne({ OrderID: req.params.id });

    const [order, delivery, payment] = await Promise.all([orderPromise, deliveryPromise, paymentPromise]);

    return res.status(200).json({
      success: true,
      data: {
        order,
        delivery,
        payment
      }
    });
  } catch (error) {
    return next(error);
  }
};

exports.cancleGlassOrder = async (req, res, next) => {
  try {



    return res.status(200).json({
      success: true,
      message: "Order is Created",
    });
  } catch (error) {
    return next(error);
  }
};
