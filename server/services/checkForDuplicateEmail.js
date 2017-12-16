function checkForDuplicateEmail(email, connection) {
  return new Promise((resolve, reject) => {
    if (!email) {
      logError('no email provided to checkEmail');
      return reject({ status: 500, error: 'Server Error' });
    }

    if (!connection) {
      logError('no connection provided to checkEmail');
      return reject({ status: 500, error: 'Server Error' });
    }

    connection.query(
      'SELECT parent_id FROM parent WHERE email = ?',
      [ email ],
      (err, result) => {
        if (err) {
          logError(err, 'db error in checkEmail #1');
          return reject({ status: 500, error: 'db error 433' });
        }
        if (result && result.length) {
          return reject({ status: 401, error: 'Email Is Already In Use' });
        }

        return resolve('ok');
      }
    );
  });
}

export default checkForDuplicateEmail;
