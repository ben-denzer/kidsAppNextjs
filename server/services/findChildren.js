function findChildren(userId, connection) {
  return new Promise((resolve, reject) => {
    if (!userId || !connection) {
      logError('bad args to findChildren');
      return reject({ status: 500, error: 'Server Error' });
    }

    connection.query(
      'SELECT username, coins FROM children WHERE parent_fk = ?',
      [ userId ],
      (err, children) => {
        if (err) {
          logError(err, 'db error in findChildren');
          return reject({ status: 500, error: 'Server Error' });
        }
        resolve({ userId, children });
      }
    );
  });
}

export default findChildren;
