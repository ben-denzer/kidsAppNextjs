const jwtKey = require('../keys/.jwtInfo').jwtKey;

function validateJwt(token, jwt, options = {}) {
  return new Promise((resolve, reject) => {
    if (!token || !jwt) {
      logError(
        '!token || !jwt in validateJwt (token should already be validated)'
      );
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
