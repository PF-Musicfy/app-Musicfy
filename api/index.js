require("dotenv").config();
require("./src/database/connectdb.js");
const express = require("express");
const authRouter = require("./src/routes/auth.route.js");
const cookieParser = require("cookie-parser");
const rutas = require("./src/routes/index");

const app = express();
const PORT = process.env.PORT || 5000;

// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(morgan('dev'));

app.use("/api/v1/auth", authRouter);
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

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
