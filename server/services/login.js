import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import createJwt from './createJwt';
import findChildren from './findChildren';
import verifyPasswordAndReturnId from './verifyPasswordAndReturnId';

function login(body, connection) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!body || !body.email || !body.password) {
        logError(body, 'Invalid body in login.js');
        reject({ status: 400, error: 'Bad Request' });
      }
      if (!connection) {
        logError('No connection passed to login.js');
        reject({ status: 500, error: 'Server Error' });
      }

      let userData = {};
      verifyPasswordAndReturnId(body, connection, bcrypt)
        .then(userId => findChildren(userId, connection))
        .then(({ children, userId }) => {
          userData.children = children;
          return createJwt(userId, jwt);
        })
        .then(token => {
          userData.token = token;
          resolve(userData);
        })
        .catch(err => {
          logError(err, 'in login.js');
          reject(err);
        });
    }, 1000);
  });
}

export default login;
