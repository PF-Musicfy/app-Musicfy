const jwt = require("jsonwebtoken");

const generateToken = (uid) => {
  const expiresIn = 60 * 15;

  try {
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn });

    return { token, expiresIn };
  } catch (error) {
    console.log(error);
  }
};

const generateRefreshToken = (uid, res) => {
  const expiresIn = 60 * 60 * 24 * 30;

  try {
    const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, {
      expiresIn,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: !(process.env.MODO === "developer"),
      expires: new Date(Date.now() + expiresIn * 1000),
    });
  } catch (error) {
    console.log(error);
  }
};

const tokenVerificationErrors = {
  "invalid signature": "The JWT signature is not valid",
  "jwt expired": "Expired JWT",
  "invalid token": "Invalid token",
  "No Bearer": "Use bearer format",
  "jwt malformed": "JWT invalid format",
};

module.exports = {
  generateToken,
  generateRefreshToken,
  tokenVerificationErrors,
};
