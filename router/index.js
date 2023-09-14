const router = require("express").Router();
const user_routes = require("./user_routes");
const glasses_router = require("./glasses_router");
const lenses_router = require("./lenese_router");
const order_router = require("./order_router");
const contactLens_router = require("./contactLens_router");

router.use("/api/user", user_routes);
router.use("/api/glasses", glasses_router);
router.use("/api/lenses", lenses_router);
router.use("/api/order", order_router);
router.use("/api/contact-lens", contactLens_router);

module.exports = router;
