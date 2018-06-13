const getAllData = require('./getAllData');
const validateJwt = require('./validateJwt');
const jwt = require('jsonwebtoken');

function validateAccountStatus(body, connection) {
  return new Promise((resolve, reject) => {
    if (!body || !body.token) {
      return reject({ status: 400, error: 'Bad Request' });
    }
    if (!connection) {
      logError('no connection sent to validateAccountExpiration');
      return reject({ status: 500, error: 'Server Error' });
    }

    validateJwt(body.token, jwt)
      .then(tokenBody => getAllData(tokenBody.userId, connection))
      .then(allData => {
        const expirationDate = allData[0].expiration_utc;
        if (expirationDate < Date.now()) {
          return reject({ status: 403, error: 'Membership Expired' });
        }
        resolve({ membershipValid: true });
      })
      .catch(err => reject(err));
  });
}

module.exports = validateAccountStatus;
