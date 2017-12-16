import { MIN_PASSWORD_LENGTH } from '../../globalConfig/globalConfig';

function hashPassword(password, bcrypt) {
  return new Promise((resolve, reject) => {
    if (!password) {
      logError('no password sent to hashPassword');
      return reject({ status: 500, error: 'Server Error' });
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      logError('invalid password sent to hashPassword');
      return reject({ status: 500, error: 'Server Error' });
    }
    if (!bcrypt) {
      logError('bcrypt not sent to hashPassword');
      return reject({ status: 500, error: 'Server Error' });
    }

    bcrypt.hash(password, 11, (err, hash) => {
      if (err || !hash) {
        logError(err || 'no hash returned', 'bcrypt hash error');
        return reject({ status: 500, error: 'Server Error' });
      }
      resolve(hash);
    });
  });
}

export default hashPassword;
