function verifyPasswordAndReturnId(body, connection, bcrypt) {
  return new Promise((resolve, reject) => {
    if (!body || !body.email || !body.password) {
      logError(body, 'Bad Args To verifyPasswordAndReturnId - should have been caught earlier');
      return reject({ status: 500, error: 'Server Error' });
    }
    if (!connection || !bcrypt) {
      logError('no connection || bcrypt passed to verifyPasswordAndReturnId');
      return reject({ status: 500, error: 'Server Error' });
    }

    connection.query(
      'SELECT parent_id, password FROM parent WHERE email = ?',
      [ body.email ],
      (err, data) => {
        if (err) {
          logError(err, 'db error in verifyPasswordAndReturnId');
          return reject({ status: 500, error: 'Server Error' });
        }
        if (!data || !data.length || !data[0].parent_id || !data[0].password) {
          return reject({ status: 401, error: 'Invalid Email Or Password' });
        }

        const { parent_id, password } = data[0];
        bcrypt.compare(body.password, password)
          .then(success => {
            if (success) {
              return resolve(parent_id);
            }
            reject({ status: 401, error: 'Invalid Email Or Password' });
          }).catch(err => {
            logError(err, 'error in bcrypt.compare - verifyPasswordAndReturnId');
            reject({ status: 500, error: 'Server Error' });
          });
      }
    );
  });
}

export default verifyPasswordAndReturnId
