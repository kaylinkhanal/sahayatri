const express = require("express");
const router = express.Router();
const {
  registerNewUser,
  loginUser,
  switchUserMode,
  changeUserPassword,
} = require("../controllers/users");
router.post("/register", registerNewUser);

router.post("/login", loginUser);

router.patch("/switchUser/:userId", switchUserMode);
router.patch("/changeUserPassword/:userId", changeUserPassword);

module.exports = router;
