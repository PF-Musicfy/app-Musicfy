import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

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
