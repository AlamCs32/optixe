const { Wishlist } = require("../model");
const { wishlistJoiSchema } = require("../service/joi/whishlistJoi");

exports.createWishlist = async (req, res, next) => {
  try {
    await wishlistJoiSchema.validateAsync(req.body, { abortEarly: false });

    req.body.userId = req.user._id

    let wishlist = await Wishlist.create(req.body)

    return res.status(200).json({
      success: true,
      data: wishlist
    });
  } catch (error) {
    return next(error);
  }
};

exports.getWishlist = async (req, res, next) => {
  try {
    let wishlist = await Wishlist.find({
      userId: req.user._id,
    }).populate("glassId contactLensId");

    return res.status(200).json({
      success: true,
      data: wishlist,
    });
  } catch (error) {
    return next(error);
  }
};


exports.deleteWishlist = async (req, res, next) => {
  try {
    let wishlist = await Wishlist.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Wishlist is Deleted",
      data: wishlist,
    });
  } catch (error) {
    return next(error);
  }
};
