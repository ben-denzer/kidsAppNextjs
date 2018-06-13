const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const createUserToken = require('./createUserToken');
const findChildren = require('./findChildren');
const verifyPasswordAndReturnId = require('./verifyPasswordAndReturnId');
const waitTime = global.MSW_DEV ? 0 : 1000;

function login(body, connection) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!body || !body.email || !body.password) {
        logError(body, 'Invalid body in login.js');
        return reject({ status: 400, error: 'Bad Request' });
      }
      if (!connection) {
        logError('No connection passed to login.js');
        return reject({ status: 500, error: 'Server Error' });
      }

      const userData = {};
      verifyPasswordAndReturnId(body, connection, bcrypt)
        .then(userId => findChildren(userId, connection))
        .then(({ children, userId }) => {
          userData.children = children;
          return createUserToken(userId, jwt);
        })
        .then(token => {
          userData.token = token;
          resolve(userData);
        })
        .catch(err => {
          logError(err, 'in login.js');
          reject(err);
        });
    }, waitTime);
  });
}

module.exports = login;
