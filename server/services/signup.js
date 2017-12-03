const bcrypt = require('bcrypt');
const checkEmail = require('./checkEmail');
const hashPassword = require('./hashPassword');
const sendVerificationEmail = require('./sendVerificationEmail');

function verifyArgs(body) {
  return new Promise((resolve, reject) => {
    const { childCount, email, password, p2 } = body;
    if (
      !childCount || !email || !password || !p2

      || email.length < 6
      || email.length > 255
      || email.indexOf('@') === -1
      || email.indexOf('.') === -1
      || email.lastIndexOf('.') < email.indexOf('@') + 2
      || email.indexOf('@') !== email.lastIndexOf('@')
      || email.lastIndexOf('.') > email.length - 3

      || password.length < 7
      || password !== p2

      || Number.isNaN(parseInt(childCount))
      || parseInt(childCount) <= 0
    ) {
      return reject({ status: 400, error: 'Bad Request' });
    }
    resolve('valid');
  });
}

function insertUser(body, hash, connection) {
  const { childCount, email, emailList, password } = body;
  const apiUrl = body.apiUrl || 'https://mysightwords.com';
  const month = 60 * 60 * 24 * 30 * 1000;

  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO parent (email, email_list, password, children_allowed, signup_utc, expiration_utc)
        VALUES(?,?,?,?,?,?)`,
      [email, emailList, hash, childCount, Date.now(), Date.now() + month ],
      (err, success) => {
        if (err) {
          logError(err, 'db error in signup #1');
          return reject({ status: 500, error: 'DB Error 77' });
        }

        console.log('sending email... commented out at the moment');
        // sendVerificationEmail({ email, apiUrl }, connection);
        resolve(success.insertId);
      }
    )
  });
}

function signup(body, connection) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      verifyArgs(body)
        .then(() => checkEmail(body.email, connection))
        .then(() => hashPassword(body.password, bcrypt))
        .then(hash => insertUser(body, hash, connection))
        .then(insertId => resolve(insertId))
        .catch(err => {
          logError(err, 'in signup.js');
          return reject({ status: err.status || 500, error: err.error || 'Server Error 777' });
        });
    }, 1000);
  });
}

module.exports = { hashPassword, insertUser, signup, verifyArgs };
