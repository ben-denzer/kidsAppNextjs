function unsubscribeUserEmail(email, connection) {
  return new Promise((resolve, reject) => {
    if (!email) {
      logError('no email provided to unsubscribeUserEmail');
      return reject(); // sending 200 back
    }

    connection.query(
      'UPDATE users SET email_list = false WHERE email = ?',
      [ email ],
      (err, success) => {
        if (err) {
          logError(err, 'db error in unsubscribeUserEmail #1');
          return reject(); // sending 200 back
        }

        resolve();
      }
    );
  });
}

module.exports = unsubscribeUserEmail;
