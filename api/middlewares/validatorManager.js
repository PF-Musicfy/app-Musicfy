import { body, validationResult } from "express-validator";

export const validationResultExpress = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export const bodyRegisterValidator = [
  body("username", "Invalid username, at least 3 characters")
    .trim()
    .isLength({ min: 3 }),
  body("email", "Invalid email").trim().isEmail().normalizeEmail(),
  body("password", "Invalid password, at least 7 characters")
    .trim()
    .isLength({ min: 7 })
    .custom((value, { req }) => {
      if (value !== req.body.repassword) {
        throw new Error("Passwords do not match");
      }
      return value;
    }),
  validationResultExpress,
];

export const bodyLoginValidator = [
  body("email", "Invalid email").trim().isEmail().normalizeEmail(),
  body("password", "Invalid password, at least 7 characters")
    .trim()
    .isLength({ min: 7 }),
  validationResultExpress,
];
