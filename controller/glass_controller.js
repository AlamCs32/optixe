"use strict";
const { Glasses } = require("../model");
const { NotFound } = require("../service/customeError");
const { productSchemaJoi } = require("../service/joi/glassJoi");
const { buildFilters } = require("../service/glassHelper");
const { getPaginatedData } = require("../service/helperFunction");


exports.createGlasses = async (req, res, next) => {
  try {
    await productSchemaJoi.validateAsync(req.body);
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

    const filters = buildFilters(queryParams);
    // Additional filter for 'price' (exact match, not regex)
    if (price) {
      filters.Price = { $lte: price };
    }

    const { data, totalRecord, pages, limit, currentPage } = await getPaginatedData(Glasses, req.query, filters)

    return res.status(200).json({
      success: true,
      data,
      pagination: {
        totalRecord, pages, limit, currentPage
      }
    });
  } catch (error) {
    return next(error);
  }
};
exports.getGlassesDetails = async (req, res, next) => {
  try {
    let glass = await Glasses.findById(req.params.id)

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
    await productSchemaJoi.validateAsync(req.body);

    let glass = await Glasses.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })

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
    let glass = await Glasses.findByIdAndDelete(req.params.id)

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
