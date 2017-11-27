const bcrypt = require('bcrypt');

function resetPw(password, email, connection) {
  return new Promise((resolve, reject) => {
    if (!password || !email) {
      logError('no password || email in resetPw');
      return reject({ status: 400, error: 'Bad Request' });
    }

    bcrypt.hash(password, 11, (err, hash) => {
      if (err) {
        logError(err, 'bcrypt hash error in resetPw');
        return reject({ status: 500, error: 'Server Error rp1' });
      }

      connection.query(
        'UPDATE users SET password = ? WHERE email = ?',
        [ hash, email ],
        (err) => {
          if (err) {
            logError(err, 'db error in resetPw #1');
            return reject({ status: 500, error: 'DB Error rp2' });
          }

          resolve();
        }
      )
    });
  });
}

module.exports = resetPw;
