const bcrypt = require('bcrypt');
const salt = require('../keys/saltRounds');

module.exports = {
  addUser(connection, body, cb) {
    console.log('body is ', body);
    if (!connection) {
      return cb({ error: 'Server Error 1', status: 500 });
    }
    if (!body.username || !body.password || !body.email) {
      return cb({ error: 'Bad Request', status: 400 });
    }

    connection.query(
      'SELECT child_id FROM children WHERE username=?',
      [body.username],
      (err, results) => {
        if (results && results.length) {
          return cb('Username is Taken');
        }

        bcrypt.hash(body.password, salt, (err, hash) => {
          if (err) {
            return cb({ error: 'Server Error 2', status: 500 });
          }

          connection.query(
            `INSERT INTO children (username, password, email) VALUES(?, ?, ?)`,
            [body.username, hash, body.email],
            (err, results) => {
              if (err) {
                return cb({ error: 'db error', status: 500 });
              }

              cb(null, 'User Created');
            }
          );
        });
      }
    );
  },

  login(connection, body, cb) {
    const { username, password } = body;
    if (!username || !password) {
      return cb({ error: 'Bad Request', status: 400 });
    }

    connection.query(
      'SELECT child_id, password, email FROM children WHERE username=?',
      [username],
      (err, results) => {
        if (err) {
          return cb({ error: 'Server Error  3', status: 500 });
        }
        if (!results.length) {
          return cb({ error: 'Invalid Username Or Password', status: 401 });
        }

        bcrypt.compare(password, results[0].password, (err, success) => {
          if (err) {
            return cb({ error: 'Server Error 4', status: 500 });
          }
          if (!success) {
            return cb({ error: 'Invalid Username Or Password', status: 401 });
          }

          const { child_id: id, email } = results[0];
          const user = { id, email, username };
          cb(null, user);
        });
      }
    );
  }
};
