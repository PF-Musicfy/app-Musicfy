const express = require("express");
const {
  infoUser,
  login,
  register,
  refreshToken,
  logout,
} = require("../controllers/auth.controller.js");
const requireToken = require("../middlewares/requireToken.js");
const requireRefreshToken = require("../middlewares/requireRefreshToken.js");
const {
  bodyLoginValidator,
  bodyRegisterValidator,
} = require("../middlewares/validatorManager.js");
const router = express.Router();

router.post("/register", bodyRegisterValidator, register);

router.post("/login", bodyLoginValidator, login);

router.get("/protected", requireToken, infoUser);
router.get("/refresh", requireRefreshToken, refreshToken);
router.get("/logout", logout);

module.exports = router;
