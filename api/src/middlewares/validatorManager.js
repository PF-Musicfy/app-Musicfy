const { body, validationResult } = require("express-validator");

const validationResultExpress = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

const bodyRegisterValidator = [
  body("username", "Invalid username, at least 3 characters")
    .trim()
    .isLength({ min: 3 }),
  body("email", "Invalid email").trim().isEmail().normalizeEmail(),
  body("password", "Invalid password, at least 8 characters")
    .trim()
    .isLength({ min: 8 })
    .custom((value, { req }) => {
      if (value !== req.body.repassword) {
        throw new Error("Passwords do not match");
      }
      return value;
    }),
  validationResultExpress,
];

const bodyLoginValidator = [
  body("email", "Invalid email").trim().isEmail().normalizeEmail(),
  body("password", "Invalid password, at least 8 characters")
    .trim()
    .isLength({ min: 8 }),
  validationResultExpress,
];

module.exports = {
  bodyRegisterValidator,
  bodyLoginValidator,
};
