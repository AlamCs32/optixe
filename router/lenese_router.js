const {
  createLenses,
  getLensesDetails,
  getLenses,
  updateLenses,
  deleteLenses,
} = require("../controller/lenses_controller");

const router = require("express").Router();

router.post("/", createLenses);

router.get("/", getLenses);
router.get("/:id", getLensesDetails);

router.put("/:id", updateLenses);
router.delete("/:id", deleteLenses);

module.exports = router;
