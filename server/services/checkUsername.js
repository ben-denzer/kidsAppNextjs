function checkUsername(username, connection) {
  return new Promise((resolve, reject) => {
    if (!username) {
      logError('no username provided to checkUsername');
      return reject({ status: 400, error: 'No username provided to checkUsername' });
    }

    connection.query(
      'SELECT user_id FROM users WHERE username = ?',
      [username],
      (err, result) => {
        if (err) {
          logError(err, 'db error in checkUsername #1');
          return reject({ status: 500, error: 'db error 33' });
        }
        if (result && result.length) {
          // don't log this
          return reject({ status: 200, error: 'Username is Taken' });
        }

        resolve();
      }
    )
  });
}

module.exports = checkUsername;
