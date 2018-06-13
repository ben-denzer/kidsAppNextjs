const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { MIN_PASSWORD_LENGTH } = require('../../globalConfig/globalConfig');
const changePasswordInDB = require('./changePasswordInDb');
const getAllData = require('./getAllData');
const hashPassword = require('./hashPassword');
const validateJwt = require('./validateJwt');
const validatePasswordAndReturnId = require('./verifyPasswordAndReturnId');

function changePasswordService(body, connection) {
  return new Promise((resolve, reject) => {
    if (
      !body ||
      !body.token ||
      !body.currentPassword ||
      !body.newPassword ||
      body.newPassword.length < MIN_PASSWORD_LENGTH
    ) {
      logError(body, 'bad request to changePasswordService');
      return reject({ status: 400, error: 'Bad Request' });
    }
    if (!connection) {
      logError('no connection sent to changePasswordService');
      return reject({ status: 500, error: 'Server Error' });
    }

    const { token, currentPassword, newPassword } = body;
    let userId;
    validateJwt(token, jwt, { ignoreExpiration: true })
      .then(tokenBody => {
        userId = tokenBody.userId;
        return getAllData(userId, connection);
      })
      .then(userData => {
        const body = { email: userData[0].email, password: currentPassword };
        return validatePasswordAndReturnId(body, connection, bcrypt);
      })
      .then(() => {
        return hashPassword(newPassword, bcrypt);
      })
      .then(hash => {
        return changePasswordInDB(userId, hash, connection);
      })
      .then(() => {
        return resolve('ok');
      })
      .catch(err => {
        if (err && err.status === 401) {
          return reject(err);
        }
        logError(err, 'error in changePasswordService');
        reject(err);
      });
  });
}

module.exports = changePasswordService;
