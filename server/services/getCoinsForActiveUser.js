function getCoinsForActiveUser(childId, connection) {
  return new Promise((resolve, reject) => {
    if (!childId || !connection) {
      logError(
        { childId },
        'No childID || connection provided to getCoinsForActiveUser'
      );
      return reject({ status: 500, error: 'Server Error' });
    }

    connection.query(
      'SELECT coins FROM children WHERE child_id = ?',
      [ childId ],
      (err, data) => {
        if (err) {
          logError(err, 'DB Error in getCoinsForActiveUser');
          return reject({ status: 500, error: 'Server Error' });
        }
        if (!data.length) {
          logError(err, 'No child returned in getCoinsForActiveUser');
          return reject({ status: 401, error: 'Unauthorized' });
        }
        resolve(data[0].coins);
      }
    );
  });
}

module.exports = getCoinsForActiveUser;
