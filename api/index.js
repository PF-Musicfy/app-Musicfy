require("dotenv").config();
require("./src/database/connectdb.js");
const express = require("express");
const authRouter = require("./src/routes/auth.route.js");
const cookieParser = require("cookie-parser");
const rutas = require("./src/routes/index");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1/auth", authRouter);

// ejemplo del login/token
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log("🔥🔥🔥 http://localhost:" + PORT);
});
//require('./db.js');

app.use("/", rutas);

app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = app;
