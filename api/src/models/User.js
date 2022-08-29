const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: { unique: true }
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/hugok2k/image/upload/c_scale,h_355,w_355/v1661641450/aedocfnxcvh3emgc65he.png"
    },
    admin: {
      type: Boolean,
      default: false
    },
    premium: {
      type: Boolean,
      default: false
    },
    isblocked: {
      type: Boolean,
      default: false
    },
    online: {
      type: Boolean,
      default: false
    },
    usermp3: {
      type: String,
      default: "test"
    }
  },
  {
    versionKey: false
  }
);

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  // const salt = await bcrypt.genSalt(10);
  // user.password = await bcrypt.hash(user.password, salt);

  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
