const { findById } = require("../models/Post.js");
const User = require("../models/User.js");
const {
  generateRefreshToken,
  generateToken,
} = require("../utils/tokenManager.js");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);
    let user = await User.findOne({ email });

    // if (user) alert("Email already exists");
    if (user) {
      return res.status(404).send(`${email} already exists`);
    }

    user = new User({ username, email, password });
    await user.save();

    // genrerar jwt
    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, res);

    return res.status(201).json({ token, expiresIn });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) throw new Error("This user does not exist");

    const responsePassword = await user.comparePassword(password);
    if (!responsePassword) throw new Error("Incorrect password");

    // generar jwt
    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, res);

    user.online = true;
    await user.save();

    return res.json({ token, expiresIn });
  } catch (error) {
    return res.status(403).json({ error: error.message });
  }
};

const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid);
    res.json(user);
  } catch (error) {
    return res.status(500).json({ error: "server error" });
  }
};

const refreshToken = (req, res) => {
  try {
    const { token, expiresIn } = generateToken(req.uid);

    return res.json({ token, expiresIn });
  } catch (error) {
    return res.status(500).json({ error: "server error" });
  }
};

const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ ok: true });
};

const premium = async (req, res) => {
  const { premium } = req.body;
  console.log(req.body);

  const user = await User.findByIdAndUpdate(req.uid, {
    premium,
  });
  // if (!user) return res.json({ message: "El usuario no existe" });
  await user.save();

  return res.json({ message: "Usuario pasado a premium" });
};

module.exports = {
  register,
  login,
  infoUser,
  refreshToken,
  logout,
  premium,
};
