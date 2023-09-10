const {
  createOrder,
  getOrder,
  getOrderDetails,
  cancleOrder,
} = require("../controller/order_controller");

const router = require("express").Router();

router.post("/", createOrder);

router.get("/", getOrder);
router.get("/:id", getOrderDetails);

router.delete("/:id", cancleOrder);

module.exports = router;
