const express = require("express");
const {
  infoUser,
  loginUser,
  registerUser,
  refreshTokenUser,
  logoutUser,
  premiumUser,
} = require("../controllers/auth.controller.js");
const requireToken = require("../middlewares/requireToken.js");
const requireRefreshToken = require("../middlewares/requireRefreshToken.js");
const {
  bodyLoginValidator,
  bodyRegisterValidator,
} = require("../middlewares/validatorManager.js");
const app = express.Router();

// Kosovomba
// app.post("/validate", bodyRegisterValidator, validate); ====== importar validate
// app.post("/register", registerUser); ======= borrar la otra /register y usar ésta

// Kosovomba

app.post("/register", bodyRegisterValidator, registerUser);

app.post("/login", bodyLoginValidator, loginUser);

app.get("/perfil", requireToken, infoUser);
app.get("/refresh", requireRefreshToken, refreshTokenUser);
app.get("/logout", logoutUser);
app.post("/premium", requireToken, premiumUser);

module.exports = app;
