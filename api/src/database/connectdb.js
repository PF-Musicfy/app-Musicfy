const mongoose = require("mongoose");

try {
  mongoose.connect(process.env.URI_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }) 
  console.log("Connect DB ok 👌");
} catch (error) {
  console.log("Mongodb connection error:" + error);
}
