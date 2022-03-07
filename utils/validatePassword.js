const capitalLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '1234567890';

function containsCapitalLetter(password) {
  for (let index = 0; index < password.length; index += 1) {
    const char = password[index];
    if (capitalLetters.includes(char)) {
      return true;
    }
  }
  return false;
}

function containsNumber(password) {
  for (let index = 0; index < password.length; index += 1) {
    const char = password[index];
    if (numbers.includes(char)) {
      return true;
    }
  }
  return false;
}

function containsSpecialCharacters(password) {
  for (let index = 0; index < password.length; index += 1) {
    const char = password[index];
    if (
      !capitalLetters.includes(char)
      && !lowercaseLetters.includes(char)
      && !numbers.includes(char)
    ) {
      return true;
    }
  }
  return false;
}

export default function validatePassword(password) {
  if (!containsCapitalLetter(password)) return 'Password must contain a capital letter!';
  if (!containsSpecialCharacters(password)) return 'Password must contain a special character!';
  if (!containsNumber(password)) return 'Password must contain a number!';
  return false;
}
