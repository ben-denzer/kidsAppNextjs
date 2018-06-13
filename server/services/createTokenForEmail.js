const jwtKey = require('../keys/.jwtInfo').jwtKey;

function createTokenForEmail(email, jwt) {
  return new Promise((resolve, reject) => {
    if (!email) {
      logError('no email sent to createTokenForEmail');
      return reject({ status: 500, error: 'Server Error' });
    }
    if (!jwt) {
      logError('no jwt sent to createTokenForEmail');
      return reject({ status: 500, error: 'Server Error' });
    }
    jwt.sign({ email }, jwtKey, { expiresIn: '2h' }, (err, token) => {
      if (err) {
        logError(err, 'jwt sign in createTokenForEmail');
        return reject({ status: 500, error: 'Server Error' });
      }
      resolve(token);
    });
  });
}

module.exports = createTokenForEmail;
