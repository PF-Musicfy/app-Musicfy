const mongoose = require("mongoose");

try {
  mongoose.connect(process.env.URI_MONGO);
  console.log("Connect DB ok 👌");
} catch (error) {
  console.log("Mongodb connection error:" + error);
}
