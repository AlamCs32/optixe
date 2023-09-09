const {
  createGlasses,
  getGlasses,
  getGlassesDetails,
  updateGlasses,
  deleteGlasses,
} = require("../controller/glass_controller");

const router = require("express").Router();

router.post("/", createGlasses);

router.get("/", getGlasses);
router.get("/:id", getGlassesDetails);

router.put("/:id", updateGlasses);

router.delete("/:id", deleteGlasses);

module.exports = router;
