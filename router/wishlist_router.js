const { createWishlist, getWishlist, deleteWishlist } = require("../controller/wishlist_controller")
const { Auth } = require("../middleware/auth")
const router = require("express").Router()


router.post("", Auth, createWishlist)
router.get("", Auth, getWishlist)
router.delete("/:id", Auth, deleteWishlist)

module.exports = router