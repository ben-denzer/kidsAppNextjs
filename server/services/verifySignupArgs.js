const { MIN_PASSWORD_LENGTH } = require('../../globalConfig/globalConfig');

function verifySignupArgs(body) {
  return new Promise((resolve, reject) => {
    const { children, email, password, p2 } = body;
    if (
      !children.length ||
      !email ||
      !password ||
      !p2 ||
      email.length < 6 ||
      email.length > 255 ||
      email.indexOf('@') === -1 ||
      email.indexOf('.') === -1 ||
      email.lastIndexOf('.') < email.indexOf('@') + 2 ||
      email.indexOf('@') !== email.lastIndexOf('@') ||
      email.lastIndexOf('.') > email.length - 3 ||
      password.length < MIN_PASSWORD_LENGTH ||
      password !== p2
    ) {
      logError(body, 'body in signup');
      return reject({ status: 400, error: 'Bad Request' });
    }
    resolve('valid');
  });
}

module.exports = verifySignupArgs;
