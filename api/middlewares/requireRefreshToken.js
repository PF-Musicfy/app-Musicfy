import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../utils/tokenManager.js";

export const requireRefreshToken = (req, res, next) => {
  try {
    const refhresTokenCookie = req.cookies.refreshToken;
    if (!refhresTokenCookie) throw new Error("The token does not exist");

    const { uid } = jwt.verify(refhresTokenCookie, process.env.JWT_REFRESH);
    req.uid = uid;

    next();
    next();
  } catch (error) {
    res.status(401).json({ error: tokenVerificationErrors[error.message] });
  }
};
