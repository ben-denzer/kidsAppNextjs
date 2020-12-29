function changePasswordInDb(id, hash, connection) {
  return new Promise((resolve, reject) => {
    if (!id || !hash || !connection) {
      logError({ id, hash, connection }, 'invalid args to changePasswordInDb');
      return reject({ status: 500, error: 'Server Error' });
    }

    connection.query(
      'UPDATE parent SET password = ? WHERE parent_id = ?',
      [ hash, id ],
      err => {
        if (err) {
          logError(err, 'DB Error in changePasswordInDb');
          return reject({ status: 500, error: 'Server Error' });
        }

        resolve({ success: true });
      }
    );
  });
}

module.exports = changePasswordInDb;
