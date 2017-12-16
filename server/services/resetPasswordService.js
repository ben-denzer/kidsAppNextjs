import jwt from 'jsonwebtoken';
import { MIN_PASSWORD_LENGTH } from '../../globalConfig/globalConfig';
import resetPasswordInDb from './resetPasswordInDb';
import validateJwt from './validateJwt';

function resetPassword(body, connection) {
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
        || !body.p2
        || body.password !== body.p2
      ) {
        reject({ status: 400, error: 'Bad Request' });
      }

      validateJwt(body.token, jwt)
        .then(tokenBody => resetPasswordInDb(tokenBody.email, body.password, connection))
        .then(() => resolve({ success: true }))
        .catch(e => reject(e));
    }, 1500);
  });
}

export default resetPassword;
