require("dotenv").config();
require("./src/database/connectdb.js");
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

const rutas = require("./src/routes/index");
const app = express();
const PORT = process.env.PORT || 5000;

const whiteList = [process.env.ORIGIN1, "http://localhost:3000", "http://127.0.0.1:3000"];
express.defaultURL = process.env.ORIGIN1 || "http://localhost:3000";

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || whiteList.includes(origin)) {
        return callback(null, origin);
      }
      return callback("Error de CORS origin: " + origin + " No autorizado!");
    },
    credentials: true
  })
);

// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

// ejemplo del login/token
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log("🔥🔥🔥 http://localhost:" + PORT);
});

app.use("/", rutas);

app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(`${err.message}\n${err}\nerror name: ${err.name}`);
  res.status(status).send(message);
});

module.exports = app;
