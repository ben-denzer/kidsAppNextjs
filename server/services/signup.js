import bcrypt from 'bcrypt';
import checkForDuplicateEmail from './checkForDuplicateEmail';
import hashPassword from './hashPassword';
import insertParent from './insertParent';
import sendVerificationEmail from './sendVerificationEmail';

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

function signup(body, connection) {
  const apiUrl = body.apiUrl || 'https://mysightwords.com';

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      verifyArgs(body)
        .then(() => checkForDuplicateEmail(body.email, connection))
        .then(() => hashPassword(body.password, bcrypt))
        .then(hash => insertParent(body, hash, connection))
        .then(insertId => {
          console.log('sending email... commented out at the moment');
          // sendVerificationEmail({ body.email, apiUrl }, connection);
          resolve(insertId)
        })
        .catch(err => {
          logError(err || 'mystery error', 'in signup.js');
          return reject({ status: err.status || 500, error: err.error || 'Server Error' });
        });
    }, 1000);
  });
}

export { verifyArgs };
export default signup;
