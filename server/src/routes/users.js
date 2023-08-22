const express = require("express");
const router = express.Router();
const {
  registerNewUser,
  loginUser,
  switchUserMode,
} = require("../controllers/users");
router.post("/register", registerNewUser);

router.post("/login", loginUser);

router.patch("/switchUser/:userId", switchUserMode);

module.exports = router;
