import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: { unique: true },
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "http://cdn.onlinewebfonts.com/svg/img_569204.png",
    },
    plan: {
      type: String,
      default: "free",
    },
  },
  {
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model("User", userSchema);
