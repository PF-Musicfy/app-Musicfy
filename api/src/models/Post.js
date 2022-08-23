const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      unique: true,
      trim: true,
      index: { unique: true },
    },
    description: {
      type: String,
    },
    avatar: {
      type: String,
      default: "http://cdn.onlinewebfonts.com/svg/img_569204.png",
    },
    plan: {
      type: String,
      default: "free",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
