function verifyUser(data, connection) {
  return new Promise((resolve, reject) => {
    if (!data || !data.email) {
      logError('no data object || email provided to verifyUser');
      return reject(); // sends 200
    }

    connection.query(
      'UPDATE users SET verified = true WHERE email = ?',
      [ data.email ],
      (err, success) => {
        if (err) {
          logError(err, 'db error in verifyUser #1');
          return reject(); // sends 200 to user
        }
        if (!success) {
          logError('no success returned from db in verifyUser');
          return reject(); // sends 200 to user
        }

        resolve();
      }
    )
  });
}

module.exports = verifyUser;
