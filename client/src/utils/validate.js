export default function validate(input) {
  let errors = {};

  if (!input.user) errors.user = "Enter your email.";

  if (!input.pass) errors.pass = "Enter your password.";

  return errors;
}
