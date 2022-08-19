import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) throw new Error("Email already exists");

    user = new User({ username, email, password });
    await user.save();

    // genrerar jwt
    const token = jwt.sign({ uid: user.id }, process.env.JWT_SECRET);

    return res.status(201).json({ token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) throw new Error("This user does not exist");

    const responsePassword = await user.comparePassword(password);
    if (!responsePassword) throw new Error("Incorrect password");

    // generar jwt
    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, res);

    return res.json({ token, expiresIn });
  } catch (error) {
    return res.status(403).json({ error: error.message });
  }
};

export const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid);
    res.json({ email: user.email, uid: user.id });
  } catch (error) {
    return res.status(500).json({ error: "server error" });
  }
};

export const refreshToken = (req, res) => {
  try {
    const { token, expiresIn } = generateToken(req.uid);

    return res.json({ token, expiresIn });
  } catch (error) {
    return res.status(500).json({ error: "server error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ ok: true });
};
