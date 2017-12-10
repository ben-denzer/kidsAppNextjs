import { jwtKey, jwtOptions } from '../keys/.jwtInfo';

function createJwt(userId, jwt) {
  return new Promise((resolve, reject) => {
    if (!userId) {
      logError('No UserId sent to createJwt');
      return reject({ status: 500, error: 'Server Error' });
    }

    if (!jwt) {
      logError('No JWT sent to createJwt');
      return reject({ status: 500, error: 'Server Error' });
    }

    jwt.sign({ userId }, jwtKey, jwtOptions, (err, token) => {
      if (err || !token) {
        logError(err || 'no token returned', 'jwt sign in createJwt');
        return reject({ status: 500, error: 'Server Error' });
      }

      resolve(token);
    });
  });
}

export default createJwt;
