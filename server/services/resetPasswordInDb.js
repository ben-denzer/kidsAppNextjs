import bcrypt from 'bcrypt';
import hashPassword from './hashPassword';

function resetPasswordInDb(email, password, connection) {
  return new Promise((resolve, reject) => {
    if (!email || !password || !connection) {
      logError({ email, password }, 'bad args in resetPasswordInDb');
      return reject({ status: 500, error: 'Server Error' });
    }

    hashPassword(password, bcrypt)
      .then(hash => {
        connection.query(
          'UPDATE parent SET password = ? WHERE email = ?',
          [ hash, email ],
          (err, result) => {
            if (err) {
              logError(err, 'in resetPasswordInDb');
              return reject({ status: 500, error: 'Server Error' });
            }
            if (!result || !result.affectedRows) {
              logError('no affected rows in resetPasswordInDb');
              return reject({ status: 401, error: 'User Not Found' });
            }
            resolve(result.affectedRows);
          }
        );
      })
      .catch(err => {
        logError(err, 'in resetPasswordInDb');
        reject(err);
      });
  });
}

export default resetPasswordInDb;
