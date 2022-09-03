export function validateLogin(input) {
  let errors = {};

  if (!input.user) errors.user = "Enter your email.";

  if (!input.pass) errors.pass = "Enter your password.";

  return errors;
}

export function validateRegister(input) {
  let errors = {};

  if (!input.name) errors.user = "Enter your username.";

  if (!input.eMail) errors.eMail = "Enter your email.";

  if (!input.password) errors.password = "Enter your password.";

  if (input.password !== input.rePassword)
    errors.doNotMatch = "Passwords do not match";

  return errors;
}
