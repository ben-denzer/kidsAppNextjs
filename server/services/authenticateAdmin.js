const bcrypt = require('bcrypt');

function authenticateAdmin(body, connection) {
  return new Promise((resolve, reject) => {

    const { username, password } = body;
    setTimeout(() => {
      if (!username || !password) {
        logError('no username || password provided to authenticateAdmin');
        return reject({ status: 401, error: 'unauthorized' });
      }
      connection.query(
        'SELECT password, admin FROM users WHERE username = ?',
        [ username ],
        (err, result) => {
          if (err) {
            logError(err, 'db error in authenticateAdmin #1');
            return reject({ status: 500, error: 'server error A234' });
          }
          if (!result || !result.length) {
            logError('No Result from db in authenticateAdmin - probably hacker');
            return reject({ status: 401, error: 'unauthorized' });
          }

          const hash = result[0].password;
          const admin = result[0].admin;

          if (!admin) {
            logError({ user: username }, 'this user is trying to access admin urls');
            return reject({ status: 401, error: 'unauthorized' });
          }

          bcrypt.compare(password, hash, (err, success) => {
            if (err) {
              logError(err, 'bcrypt compare error in authenticateAdmin');
              return reject({ status: 500, error: 'server error A235' });
            }
            if (!success) {
              logError({ user: username }, 'unsuccessful admin login from this user');
              return reject({ status: 401, error: 'unauthorized' });
            }

            resolve();
          });
        }
      )
    }, 5000);
  });
}

module.exports = authenticateAdmin;
