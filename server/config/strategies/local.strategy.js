const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function localAuth(connection) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password'
      },
      (username, password, done) => {
        setTimeout(() => {
          if (!username || !password) {
            logError('no username || password provided to local.strategy');
            return done('bad request 00');
          }
          connection.query(
            'SELECT user_id, password FROM users WHERE username = ?',
            [ username ],
            (err, result) => {
              if (err) {
                logError(err, 'db error in local.strategy #1');
                return done('db error 11');
              }
              if (!result || !result.length) {
                // don't log this
                return done(null, false);
              }

              const hash = result[0].password;
              const userId = result[0].user_id;

              bcrypt.compare(password, hash, (err, success) => {
                if (err) {
                  logError(err, 'bcrypt compare error in local.strategy');
                  return done('server error 22');
                }
                if (!success) {
                  // don't log
                  return done(null, false);
                }
                const user = { userId, username };
                done(null, user);
              });
            }
          )
        }, 1000);
      }
    )
  );
}

module.exports = localAuth;
