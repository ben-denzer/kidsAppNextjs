function checkEmail(email, connection) {
  return new Promise((resolve, reject) => {
    if (!email) {
      logError('no email provided to checkEmail');
      return reject({ status: 400, error: 'No email provided to checkEmail' });
    }

    connection.query(
      'SELECT user_id FROM users WHERE email = ?',
      [email],
      (err, result) => {
        if (err) {
          logError(err, 'db error in checkEmail #1');
          return reject({ status: 500, error: 'db error 433' });
        }
        if (result && result.length) {
          // don't log this
          return reject({ status: 200, error: 'Email Is Already In Use' });
        }
        
        resolve();
      }
    );
  });
}

module.exports = checkEmail;
