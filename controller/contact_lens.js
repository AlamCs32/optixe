const { ContactLens, TechnicalInfo, SubCategory, Lenses } = require("../model");
const { contactLensesSchemaJoi } = require("../service/joi/contactLensJoi");
const { NotFound } = require("../service/customeError");
const mongoose = require("mongoose");

exports.createContactLens = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    // Validate the request body against the Joi schema
    await contactLensesSchemaJoi.validateAsync(req.body, { abortEarly: false });
    // Start a new Mongoose session
    session.startTransaction();

    // Create technical information
    let technical_info = await TechnicalInfo.create(req.body.technicalInfo);

    // Update the lense object with TechnicalInfoID
    req.body.lense.TechnicalInfoID = technical_info._id;

    // Create the contact lens
    let lens = await ContactLens.create(req.body.lense);

    // Create SubCategory with the lens color and lens ID
    await SubCategory.create({
      type: lens.LensColor,
      CantactLensID: lens._id,
    });
    // Commit the transaction
    await session.commitTransaction();

    return res.status(200).json({
      success: true,
      data: {
        lens,
        technical_info,
      },
    });
  } catch (error) {
    // Abort the transaction and handle errors
    await session.abortTransaction();
    return next(error);
  } finally {
    // End the session regardless of success or failure
    await session.endSession();
  }
};

exports.getContactLens = async (req, res, next) => {
  try {
    let lens = await ContactLens.find();
    return res.status(200).json({
      success: true,
      data: lens,
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
  const session = await mongoose.startSession();
  try {
    await contactLensesSchemaJoi.validateAsync(req.body, { abortEarly: false });

    session.startTransaction();
    let lens = await ContactLens.findByIdAndUpdate(
      req.params.id,
      req.body.lense,
      {
        new: true,
      }
    ).catch((e) => next(NotFound()));

    let technical = await TechnicalInfo.findByIdAndUpdate(
      lens.TechnicalInfoID,
      req.body.technicalInfo,
      { new: true }
    ).catch((e) => next(NotFound()));

    await session.commitTransaction();
    return res.status(200).json({
      success: true,
      message: "Conatct Lense Details is Updated",
      data: {
        lens,
        technical,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    return next(error);
  }
};

exports.deleteContactLens = async (req, res, next) => {
  try {
    let lens = await ContactLens.findById(req.params.id)
      .populate("TechnicalInfoID")
      .catch((e) => next(e));

    if (!lens) return next(NotFound("Contact-Lens Not Found "));

    await lens.TechnicalInfoID?.deleteOne();
    await lens.deleteOne();

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
