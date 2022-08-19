const jwt = require("jsonwebtoken");
const { tokenVerificationErrors } = require("../utils/tokenManager.js");

const requireToken = (req, res, next) => {
  try {
    let token = req.headers?.authorization;

    if (!token)
      throw new Error(
        "The token does not exist in the header, use bearer format"
      );

    token = token.split(" ")[1];
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;

    next();
  } catch (error) {
    return res
      .status(401)
      .send({ error: tokenVerificationErrors[error.message] });
  }
};

module.exports = requireToken;
