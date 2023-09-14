const {
  createContactLens,
  getContactLens,
  getContactLensDetails,
  updateContactLens,
  deleteContactLens,
} = require("../controller/contact_lens");
// const {
//   withTransaction,
//   endTransaction,
// } = require("../middleware/transaction"); // !Testing Mode
const router = require("express").Router();

router.post("/", createContactLens);
router.get("/", getContactLens);
router.get("/:id", getContactLensDetails);
router.put("/:id", updateContactLens);
router.delete("/:id", deleteContactLens);

module.exports = router;
