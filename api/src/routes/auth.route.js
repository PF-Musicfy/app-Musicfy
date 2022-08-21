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
const app = express.Router();

app.post("/register", bodyRegisterValidator, register);

app.post("/login", bodyLoginValidator, login);

app.get("/protected", requireToken, infoUser);
app.get("/refresh", requireRefreshToken, refreshToken);
app.get("/logout", logout);

module.exports = app;
