const express = require("express");
const {
  infoUser,
  loginUser,
  validate,
  registerUser,
  refreshTokenUser,
  logoutUser,
  premiumUser,
  avatarUser,
  favoritesUser,
  favoritesDelete,
  playlistUser,
  musicPlaylist
  // setmp3
} = require("../controllers/auth.controller.js");
const requireToken = require("../middlewares/requireToken.js");
const requireRefreshToken = require("../middlewares/requireRefreshToken.js");
const { bodyLoginValidator, bodyRegisterValidator } = require("../middlewares/validatorManager.js");
const app = express.Router();

// Kosovomba
app.post("/validate", bodyRegisterValidator, validate);
app.post("/register", registerUser);

// Kosovomba

// app.post("/register", bodyRegisterValidator, registerUser);
app.post("/login", bodyLoginValidator, loginUser);
app.get("/perfil", requireToken, infoUser);
app.get("/refresh", requireRefreshToken, refreshTokenUser);
app.get("/logout", logoutUser);
app.post("/premium", requireToken, premiumUser);
app.post("/setavatar", requireToken, avatarUser);
app.post("/favorites", requireToken, favoritesUser);
app.post("/remove", requireToken, favoritesDelete);
app.post("/playlist", requireToken, playlistUser);
app.post("/musicplaylist", requireToken, musicPlaylist );
// app.post("/setmp3", requireToken, setmp3);

module.exports = app;
