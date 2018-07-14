const jwtKey = require('../keys/.jwtInfo').jwtKey;
const jsonWebToken = require('jsonwebtoken');

function validateJwt(token, jwt = jsonWebToken, options = {}) {
  return new Promise((resolve, reject) => {
    if (!token) {
      logError('!token in validateJwt');
      return reject({ status: 500, error: 'Server Error' });
    }

    jwt.verify(token, jwtKey, options, (err, tokenBody) => {
      if (err) {
        if (/expired/i.test(err.name)) {
          return reject({ status: 401, error: 'Token Expired' });
        }

        logError(err, 'in validateJwt');
        return reject({ status: 500, error: 'Server Error' });
      }

      resolve(tokenBody);
    });
  });
}

module.exports = validateJwt;
