import jwt from 'jsonwebtoken';
import { MIN_PASSWORD_LENGTH } from '../../globalConfig/globalConfig';
import resetPasswordInDb from './resetPasswordInDb';
import validateJwt from './validateJwt';
const waitTime = global.MSW_DEV ? 0 : 1500;

function resetPasswordService(body, connection) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!body || !connection) {
        logError('no body || connection sent to resetPassword');
        return reject({ status: 500, error: 'Server Error' });
      }
      if (
        !body.token
        || !body.password
        || body.password.length < MIN_PASSWORD_LENGTH
        || body.password !== body.p2
      ) {
        return reject({ status: 400, error: 'Bad Request' });
      }

      validateJwt(body.token, jwt)
        .then(tokenBody => resetPasswordInDb(tokenBody.email, body.password, connection))
        .then(() => resolve({ success: true }))
        .catch(err => {
          logError(err, 'in resetPasswordService');
          reject(err);
        });
    }, waitTime);
  });
}

export default resetPasswordService;
