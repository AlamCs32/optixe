const {
  singup,
  login,
  changePassword,
  resetPasswordSendLink,
  resetPassword,
  getProfile,
  updateProfile,
} = require("../controller/user_controller");
const { Auth } = require("../middleware/auth");
const router = require("express").Router();

router.post("/singup", singup);
router.post("/login", login);
router.put("/change-password", Auth, changePassword);

router.post("/reset/password", resetPasswordSendLink);
router.put("/reset/password/:id/:token", resetPassword);

// Profile
router.get("/profile", Auth, getProfile);
router.put("/profile", Auth, updateProfile);

module.exports = router;
