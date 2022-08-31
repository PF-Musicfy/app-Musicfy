const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    description: {
      type: String,
    },
    date: {
      type: String,
      default: new Date().toLocaleDateString('en-us', {
        year:"numeric",
        month:"short",
        day:"2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }),
    },
  },
  {
    versionKey: false,
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
