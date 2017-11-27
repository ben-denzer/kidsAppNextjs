const bcrypt = require('bcrypt');

function changePw(userId, oldPw, newPw, connection) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      connection.query(
        'SELECT u.password FROM users u WHERE user_id = ?',
        [ userId ],
        (err, rows) => {
          if (err) {
            logError(err, 'db error in changePw #1');
            return reject({ status: 500, error: 'DB Error 24' });
          }
          if (!rows) {
            logError('calling changePw with bad userId');
            return reject({ status: 401, error: 'Not Authorized' });
          }
          
          const hash = rows[0].password;
          bcrypt.compare(oldPw, hash, (err, success) => {
            if (err) {
              logError(err, 'bcrypt compare error in changePw');
              return reject({ status: 500, error: 'Server Error 25' });
            }
            if (!success) {
              // don't log this
              return reject({ status: 401, error: 'Invalid Password' });
            }

            bcrypt.hash(newPw, 11, (err, hash) => {
              if (err) {
                logError(err, 'bcrypt hash error in changePw');
                return reject({ status: 500, error: 'Server Error 26' });
              }

              connection.query(
                `UPDATE users SET password = "${hash}" WHERE user_id = ?`,
                [ userId ],
                (err, success) => {
                  if (err) {
                    logError(err, 'db error in changePw #2');
                    return reject({ status: 500, error: 'Server Error 27' });
                  }
                  resolve();
                }
              )
            });
          });
        }
      );
    }, 1000);
  });
}

module.exports = changePw;
