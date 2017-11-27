function checkEmailVerification(userId, connection, cb) {
  return new Promise((resolve, reject) => {
    if (!userId) {
      logError('no userId provided to checkEmailVerification');
      return reject({ status: 400, error: 'no userId sent to checkEmailVerification' });
    }

    connection.query(
      'SELECT verified, email FROM users WHERE user_id = ?',
      [ userId ],
      (err, result) => {
        if (err) {
          logError(err, 'db error in checkEmailVerification #1');
          return reject({ status: 500, error: 'db error A33' });
        }
        if (!result || !result.length) {
          logError({ reqUserId: userId }, 'no user returned from db in checkEmailVerification');
          return reject({ status: 400, error: 'no user in checkEmailVerification' });
        }

        resolve({ email: result[0].email, verified: result[0].verified });
      }
    );
  });
}

module.exports = checkEmailVerification;
