function insertParent(body, hash, connection) {
  return new Promise((resolve, reject) => {
    if (!body || !hash || !connection) {
      if (!body) logError('no body provided to insertParent');
      if (!hash) logError('no hash provided to insertParent');
      if (!connection) logError('no connection provided to insertParent');
      return reject({ status: 500, error: 'Server Error' });
    }

    const { childCount, email, emailList } = body;
    const month = 60 * 60 * 24 * 30 * 1000;

    if (!childCount || !email) {
      logError(body, 'Bad args in insertParent - should have been caught before this');
      return reject({ status: 500, error: 'Server Error' });
    }

    connection.query(
      `INSERT INTO parent (email, email_list, password, children_allowed, signup_utc, expiration_utc)
        VALUES(?,?,?,?,?,?)`,
      [email, emailList, hash, childCount, Date.now(), Date.now() + month ],
      (err, success) => {
        if (err) {
          logError(err, 'db error in insertParent');
          return reject({ status: 500, error: 'Server Error' });
        }

        if (!success || !success.insertId) {
          logError(success, 'no success || insertId from insertParent');
          return reject({ status: 500, error: 'Server Error' });
        }

        resolve(success.insertId);
      }
    )
  });
}

module.exports = insertParent;