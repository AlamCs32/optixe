const { ContactLens, TechnicalInfo, SubCategory } = require("../model");
const { contactLensesSchemaJoi } = require("../service/joi/contactLensJoi");
const { NotFound } = require("../service/customeError");
const { getPaginatedData, contactLenseFilter } = require("../service/helperFunction");

exports.createContactLens = async (req, res, next) => {

  try {
    // Validate the request body against the Joi schema
    await contactLensesSchemaJoi.validateAsync(req.body);

    let technical_info = await TechnicalInfo.create(req.body.technicalInfo);

    req.body.lense.TechnicalInfoID = technical_info._id;

    let lens = await ContactLens.create(req.body.lense);

    await SubCategory.create({
      type: lens.Lens_Color,
      CantactLensID: lens._id,
    });

    return res.status(200).json({
      success: true,
      data: {
        lens,
        technical_info,
      },
    });
  } catch (error) {
    return next(error);
  }
};

exports.getContactLens = async (req, res, next) => {
  try {

    const search = await contactLenseFilter(req.query)

    const { data, totalRecord, pages, limit, currentPage } = await getPaginatedData(ContactLens, req.query, search)

    return res.status(200).json({
      success: true,
      data,
      pagination: {
        limit, pages, currentPage, totalRecord
      }
    });
  } catch (error) {
    return next(error);
  }
};

exports.getContactLensDetails = async (req, res, next) => {
  try {
    let lens = await ContactLens.findById(req.params.id).populate(
      "TechnicalInfoID"
    );

    return res.status(200).json({
      success: true,
      data: lens,
    });
  } catch (error) {
    return next(error);
  }
};

exports.updateContactLens = async (req, res, next) => {

  try {
    await contactLensesSchemaJoi.validateAsync(req.body);

    let lens = await ContactLens.findByIdAndUpdate(
      req.params.id,
      req.body.lense,
      {
        new: true,
      }
    )

    let technical = await TechnicalInfo.findByIdAndUpdate(
      lens.TechnicalInfoID,
      req.body.technicalInfo,
      { new: true }
    )
    return res.status(200).json({
      success: true,
      message: "Conatct Lense Details is Updated",
      data: {
        lens,
        technical,
      },
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteContactLens = async (req, res, next) => {
  try {
    let lens = await ContactLens.findById(req.params.id)
      .populate("TechnicalInfoID")

    if (!lens) return next(NotFound("Contact-Lens Not Found "));

    await lens.TechnicalInfoID?.deleteOne();
    await lens.deleteOne();

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};