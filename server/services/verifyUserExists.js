function verifyUserExists(email, connection) {
  return new Promise((resolve, reject) => {
    if (!email) {
      logError('no email sent to verifyUserExists');
      reject({ status: 500, error: 'Server Error' });
    }
    if (!connection) {
      logError('no connection sent to verifyUserExists');
      reject({ status: 500, error: 'Server Error' });
    }

    connection.query(
      'SELECT parent_id FROM parent WHERE email = ?',
      [ email ],
      (err, rows) => {
        if (err) {
          logError(err, 'db error in verifyUserExists');
          return reject({ status: 500, error: 'Server Error #VEUX1' });
        }
        if (!rows || !rows.length || !rows[0].parent_id) {
          return reject({ status: 401, error: 'We don\'t have that email address on file' });
        }

        resolve(rows[0].parent_id);
      }
    );
  });
}

export default verifyUserExists;
