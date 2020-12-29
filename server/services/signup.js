const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkForDuplicateEmail = require('./checkForDuplicateEmail');
const createUserToken = require('./createUserToken');
const hashPassword = require('./hashPassword');
const insertParentAndChildren = require('./insertParentAndChildren');
const verifySignupArgs = require('./verifySignupArgs');
const waitTime = global.MSW_DEV ? 0 : 1000;

function signup(body, connection) {
  let children = [];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      verifySignupArgs(body)
        .then(() => checkForDuplicateEmail(body.email, connection))
        .then(() => hashPassword(body.password, bcrypt))
        .then(hash => insertParentAndChildren(body, hash, connection))
        .then(({ parentId, childArray }) => {
          children = childArray;
          return createUserToken(parentId, jwt);
        })
        .then(token => {
          const userData = { token, children };
          resolve(userData);
        })
        .catch(err => {
          logError(err || 'mystery error', 'in signup.js');
          return reject(err);
        });
    }, waitTime);
  });
}

module.exports = signup;
