const { Lenses } = require("../model");
const { lensesSchemaJoi } = require("../service/joi/lensesJoi");
const { NotFound } = require("../service/customeError");
const { getPaginatedData } = require("../service/helperFunction")
exports.createLenses = async (req, res, next) => {
  try {
    await lensesSchemaJoi.validateAsync(req.body);

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
    const { Name, price } = req.query;
    const search = {};

    if (Name) search.Name = { $regex: new RegExp(Name, "i") };
    if (price) search.Price = { $regex: new RegExp(price) };


    const { data, totalRecord, pages, limit, currentPage } = await getPaginatedData(Lenses, req.query, search)

    return res.status(200).json({
      success: true,
      data,
      pagination: {
        pages,
        totalRecord,
        currentPage,
        limit
      }
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
    await lensesSchemaJoi.validateAsync(req.body);

    let lenses = await Lenses.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })

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
    let lenses = await Lenses.findByIdAndDelete(req.params.id)

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
