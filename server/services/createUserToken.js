const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtInfo = require('../config/.jwtinfo').key;
const sessionSecret = require('../config/.sessionSecret');

function createUserToken(user, cb) {
  if (!user) {
    logError('no user provided to createUserToken');
    return cb({ status: 401, error: 'no user' });
  }
  const { userId, username } = user;

  bcrypt.hash(userId + sessionSecret, 2, (err, hash) => {
    if (err) {
      logError(err, 'bcrypt hash error in createUserToken');
      return cb(null, '');
    }

    jwt.sign({ hash, username }, jwtInfo, { expiresIn: '30d' }, (err, token) => {
      if (err) {
        logError(err, 'jwt sign error in createUserToken');
        return cb(null, '');
      }

      cb(null, token);
    });
  });
}

module.exports = createUserToken;
