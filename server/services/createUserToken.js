import { jwtKey, jwtOptions } from '../keys/.jwtInfo';

function createUserToken(userId, jwt) {
  return new Promise((resolve, reject) => {
    if (!userId) {
      logError('No UserId sent to createUserToken');
      return reject({ status: 500, error: 'Server Error' });
    }

    if (!jwt) {
      logError('No JWT sent to createUserToken');
      return reject({ status: 500, error: 'Server Error' });
    }

    jwt.sign({ userId }, jwtKey, jwtOptions, (err, token) => {
      if (err || !token) {
        logError(err || 'no token returned', 'jwt sign in createUserToken');
        return reject({ status: 500, error: 'Server Error' });
      }

      resolve(token);
    });
  });
}

export default createUserToken;
