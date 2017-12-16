import { jwtKey } from '../keys/.jwtInfo';

function validateJwt(token, jwt) {
  return new Promise((resolve, reject) => {
    if (!token || !jwt) {
      logError('!token || !jwt in validateJwt (token should already be validated)');
      return reject({ status: 500, error: 'Server Error' });
    }

    jwt.verify(token, jwtKey, (err, tokenBody) => {
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

export default validateJwt;
