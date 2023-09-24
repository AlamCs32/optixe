"use strict";
const { Glasses } = require("../model");
const { NotFound } = require("../service/customeError");
const { productSchemaJoi } = require("../service/joi/glassJoi");
const { buildFilters } = require("../service/glassHelper");

exports.createGlasses = async (req, res, next) => {
  try {
    await productSchemaJoi.validateAsync(req.body, { abortEarly: false });
    req.body.Images = ["sunglasses_front.jpg", "sunglasses_side.jpg"];

    let glass = await Glasses.create(req.body);

    return res.status(200).json({
      success: true,
      message: "Product Created!",
      data: glass,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getGlasses = async (req, res, next) => {
  try {
    const { price, page, ...queryParams } = req.query;
    const limit = 20;
    const skip = (parseInt(page) - 1 || 0) * limit;

    const filters = buildFilters(queryParams);

    // Additional filter for 'price' (exact match, not regex)
    if (price) {
      filters.Price = { $lte: price };
    }
    const count = await Glasses.countDocuments(filters)
    const glasses = await Glasses.find(filters).skip(skip).limit(limit);

    return res.status(200).json({
      success: true,
      data: glasses,
      count
    });
  } catch (error) {
    return next(error);
  }
};
exports.getGlassesDetails = async (req, res, next) => {
  try {
    let glass = await Glasses.findById(req.params.id).catch((e) =>
      next(NotFound())
    );

    if (!glass) return next(NotFound());

    return res.status(200).json({
      success: true,
      data: glass,
    });
  } catch (error) {
    return next(error);
  }
};

exports.updateGlasses = async (req, res, next) => {
  try {
    await productSchemaJoi.validateAsync(req.body, { abortEarly: false });

    let glass = await Glasses.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).catch((e) => next(NotFound()));

    if (!glass) return next(NotFound());

    return res.status(200).json({
      success: true,
      message: "Glasses Details is updated.",
      data: glass,
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteGlasses = async (req, res, next) => {
  try {
    let glass = await Glasses.findByIdAndDelete(req.params.id).catch((e) =>
      next(NotFound())
    );

    if (!glass) return next(NotFound());

    return res.status(200).json({
      success: true,
      message: "Glass is Deleted",
      data: glass,
    });
  } catch (error) {
    return next(error);
  }
};
