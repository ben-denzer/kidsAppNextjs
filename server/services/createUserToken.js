const jwtInfo = require('../keys/.jwtInfo');
const { jwtKey, jwtOptions } = jwtInfo;

function createUserToken(userId, jwt, extraOptions) {
  return new Promise((resolve, reject) => {
    if (!userId) {
      logError('No UserId sent to createUserToken');
      return reject({ status: 500, error: 'Server Error' });
    }

    if (!jwt) {
      logError('No JWT sent to createUserToken');
      return reject({ status: 500, error: 'Server Error' });
    }

    const options = Object.assign({}, jwtOptions, extraOptions);
    jwt.sign({ userId }, jwtKey, options, (err, token) => {
      if (err || !token) {
        logError(err || 'no token returned', 'jwt sign in createUserToken');
        return reject({ status: 500, error: 'Server Error' });
      }

      resolve(token);
    });
  });
}

module.exports = createUserToken;
