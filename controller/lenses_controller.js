const { Lenses } = require("../model");
const { lensesSchemaJoi } = require("../service/joi/lensesJoi");
const { NotFound } = require("../service/customeError");
exports.createLenses = async (req, res, next) => {
  try {
    await lensesSchemaJoi.validateAsync(req.body, { abortEarly: false });

    let lenses = await Lenses.create(req.body).catch((e) => next(e));

    return res.status(200).json({
      success: true,
      message: "lense Created",
      data: lenses,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getLenses = async (req, res, next) => {
  try {
    const { Name, price, page } = req.query;
    const limit = 20;
    const skip = (parseInt(page) - 1 || 0) * limit;

    const search = {};

    if (Name) search.Name = { $regex: new RegExp(Name, "i") };
    if (price) search.Price = { $regex: new RegExp(price) };

    let lenses = await Lenses.find(search).skip(skip).limit(20);

    return res.status(200).json({
      success: true,
      data: lenses,
    });
  } catch (error) {
    return next(error);
  }
};
exports.getLensesDetails = async (req, res, next) => {
  try {
    let lenses = await Lenses.findById(req.params.id).catch((e) =>
      next(NotFound("Lense Not Found"))
    );
    if (!lenses) return next(NotFound("Lense Not Found"));

    return res.status(200).json({
      success: true,
      data: lenses,
    });
  } catch (error) {
    return next(error);
  }
};

exports.updateLenses = async (req, res, next) => {
  try {
    await lensesSchemaJoi.validateAsync(req.body, { abortEarly: false });

    let lenses = await Lenses.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).catch((e) => next(NotFound("Lense Not Found")));

    if (!lenses) return next(NotFound("Lense Not Found"));

    return res.status(200).json({
      success: true,
      message: "Lenses Deatils is Updated.",
      data: lenses,
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteLenses = async (req, res, next) => {
  try {
    let lenses = await Lenses.findByIdAndDelete(req.params.id).catch((e) =>
      next(NotFound("Lense Not Found"))
    );
    if (!lenses) return next(NotFound("Lense Not Found"));

    return res.status(200).json({
      success: true,
      message: "Lenses Record is Deleted.",
      data: lenses,
    });
  } catch (error) {
    return next(error);
  }
};
