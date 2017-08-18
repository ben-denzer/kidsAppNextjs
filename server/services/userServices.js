const bcrypt = require('bcrypt');
const salt = require('../keys/saltRounds');

function addUser(connection, body, cb) {
  console.log('body is ', body);
  if (!connection || !body.username || !body.password || !body.email) {
    return cb('Server Error 1');
  }

  connection.query(
    'SELECT child_id FROM children WHERE username=?',
    [body.username],
    (err, results) => {
      console.log('results', results);
      if (results && results.length) return cb('Username is Taken');

      bcrypt.hash(body.password, salt, (err, hash) => {
        if (err) return cb('Server Error 2');

        connection.query(
          `INSERT INTO children (username, password, email) VALUES(?, ?, ?)`,
          [body.username, hash, body.email],
          (err, results) => {
            if (err) return cb('db error');
            cb(null, 'User Created');
          }
        );
      });
    }
  );
}

module.exports.addUser = addUser;
