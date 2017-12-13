function verifyPassword(body, connection, bcrypt) {
  return new Promise((resolve, reject) => {
    if (!body || !body.email || !body.password) {
      logError(body, 'Bad Args To verifyPassword - should have been caught earlier');
      return reject({ status: 500, error: 'Server Error' });
    }
    if (!connection || !bcrypt) {
      logError('no connection || bcrypt passed to verifyPassword');
      return reject({ status: 500, error: 'Server Error' });
    }

    connection.query(
      'SELECT parent_id, password FROM parent WHERE email = ?',
      [ body.email ],
      (err, data) => {
        if (err) {
          logError(err, 'db error in verifyPassword');
          return reject({ status: 500, error: 'Server Error' });
        }

        const { parent_id, password } = data[0];
        bcrypt.compare(body.password, password)
          .then(success => {
            if (success) {
              return resolve(parent_id);
            }
            reject({ status: 401, error: 'Invalid Email Or Password' });
          }).catch(err => {
            logError(err, 'error in bcrypt.compare - verifyPassword');
            reject({ status: 500, error: 'Server Error' });
          });
      }
    );
  });
}

export default verifyPassword
