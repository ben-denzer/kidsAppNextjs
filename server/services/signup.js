const bcrypt = require('bcrypt');
const checkUsername = require('./checkUsername');
const checkEmail = require('./checkEmail');
const sendVerificationEmail = require('./sendVerificationEmail');

function signup(body, connection) {
  const { username, password, password2, email, emailList, apiUrl } = body;
  const emailListBool = /on/.test(emailList) ? true : false;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!username || !password || !password2 || !email) {
        logError({ reqBody: body }, 'bad request in signup');
        return reject({ status: 400, error: 'Bad Request' });
      }

      if (password !== password2) return reject({ status: 403, error: 'Passwords Do Not Match'});

      checkUsername(username, connection)
        .then(() => checkEmail(email, connection))
        .then(() => {
          bcrypt.hash(password, 11, (err, hash) => {
            if (err) {
              logError(err, 'bcrypt hash error in signup');
              return reject({ status: 500, error: 'Server Error' });
            }

            connection.query(
              'INSERT INTO users (username, password, email, email_list, date) VALUES(?,?,?,?,?)',
              [username, hash, email, emailListBool, Date.now() ],
              (err, success) => {
                if (err) {
                  logError(err, 'db error in signup #1');
                  return reject({ status: 500, error: 'DB Error 77' });
                }

                // sendVerificationEmail({ email, apiUrl }, connection);
                resolve(success.insertId, emailListBool);
              }
            )
          });
        }).catch(err => {
          reject(err);
          return;
        });
    }, 1000);
  });
}

module.exports = signup;
