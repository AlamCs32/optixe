const {
  createGlassOrder,
  getGlassOrder,
  getOrderGlassDetails,
  cancleGlassOrder,
} = require("../controller/order_controller");
const { Auth } = require("../middleware/auth")
const router = require("express").Router();

router.post("/glass", Auth, createGlassOrder);

router.get("/glass", Auth, getGlassOrder);
router.get("/glass/:id", Auth, getOrderGlassDetails);

router.delete("/glass/:id", Auth, cancleGlassOrder);

module.exports = router;
