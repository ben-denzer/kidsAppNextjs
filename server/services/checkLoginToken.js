const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtInfo = require('../config/.jwtinfo').key;
const sessionSecret = require('../config/.sessionSecret');

function checkLoginToken(token, connection) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtInfo, (err, tokenInfo) => {
      if (err) {
        try {
          if (JSON.parse(JSON.stringify(err)).name !== 'TokenExpiredError') {
            logError({ token, error: err }, 'jwt verify error in checkLoginToken');
          }
        } catch(e) {
          logError({ realErr: err, tryCatchError: e }, 'in catch - jwt.verify checkLoginToken');
        }
        return reject(); // sends 200 to user
      }

      const { hash, username } = tokenInfo;
      connection.query(
        'SELECT user_id FROM users WHERE username = ?',
        [ username ],
        (err, rows) => {
          if (err) {
            logError(err, 'db error in checkLoginToken #1');
            return reject({ status: 500, error: 'db error B2323' }); // sends 200 to user
          }
          if (!rows || !rows.length) {
            // don't log this
            return reject(); // sends 200 to user
          }

          const userId = rows[0].user_id;

          bcrypt.compare(userId + sessionSecret, hash, (err, success) => {
            if (err) {
              logError('bcrypt compare error in checkLoginToken');
              return reject({ status: 500, error: 'server error B2324' }); // sends 200 to user
            }
            if (!success) {
              return reject({ status: 200, error: 'unsuccessful login from token' });
            }

            const user = { userId, username };
            resolve(user);
          });
        }
      );
    });
  });
}

module.exports = checkLoginToken;
