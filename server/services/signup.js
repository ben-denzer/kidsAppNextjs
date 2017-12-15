import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import checkForDuplicateEmail from './checkForDuplicateEmail';
import createJwt from './createJwt';
import hashPassword from './hashPassword';
import insertParent from './insertParent';

function verifyArgs(body) {
  return new Promise((resolve, reject) => {
    const { childCount, children, email, password, p2 } = body;
    if (
      !childCount || !children.length || !email || !password || !p2

      || email.length < 6
      || email.length > 255
      || email.indexOf('@') === -1
      || email.indexOf('.') === -1
      || email.lastIndexOf('.') < email.indexOf('@') + 2
      || email.indexOf('@') !== email.lastIndexOf('@')
      || email.lastIndexOf('.') > email.length - 3

      || password.length < 7
      || password !== p2

      || Number.isNaN(parseInt(childCount, 10))
      || parseInt(childCount, 10) <= 0
      || children.length !== Number(childCount)
    ) {
      logError(body, 'body in signup');
      return reject({ status: 400, error: 'Bad Request' });
    }
    resolve('valid');
  });
}

function signup(body, connection) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      verifyArgs(body)
        .then(() => checkForDuplicateEmail(body.email, connection))
        .then(() => hashPassword(body.password, bcrypt))
        .then(hash => insertParent(body, hash, connection))
        .then(insertId => createJwt(insertId, jwt))
        .then(token => {
          const children = body.children.map(name => ({ name, coins: 0 }));
          const userData = { token, children };
          resolve(userData);
        })
        .catch(err => {
          logError(err || 'mystery error', 'in signup.js');
          return reject(err);
        });
    }, 1000);
  });
}

export { verifyArgs };
export default signup;
