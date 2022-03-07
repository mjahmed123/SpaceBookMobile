import emailValidator from 'email-validator';
import validatePassword from './validatePassword';

function validate(value, message, optional) {
  if (!value && optional) return undefined;
  if (!value.trim()) return message;
  return undefined;
}

export default function validateFields({
  firstName, lastName, email, password,
}, optional = false) {
  const firstNameError = validate(firstName, 'First name is not provided!');
  if (firstNameError) {
    return firstNameError;
  }
  const lastNameError = validate(lastName, 'Last name is not provided!');
  if (lastNameError) {
    return lastNameError;
  }
  const emailError = validate(email, 'Email is not provided!');
  if (emailError) {
    return emailError;
  }

  let passwordError = validate(password, 'Password is not provided!', optional);
  if (passwordError) {
    return passwordError;
  }

  if ((optional && email) || !optional) {
    if (!emailValidator.validate(email)) {
      return 'Email provided is not valid!';
    }
  }

  if ((optional && password) || !optional) {
    passwordError = validatePassword(password);
    if (passwordError) return passwordError;
    if (password.length <= 5) {
      return 'Password must be longer than 5 characters!';
    }
  }
  return undefined;
}
