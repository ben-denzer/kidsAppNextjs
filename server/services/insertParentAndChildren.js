/* eslint-disable no-loop-func */

function insertParent(body, hash, connection) {
  return new Promise((resolve, reject) => {
    if (!body || !hash || !connection) {
      if (!body) logError('no body provided to insertParent');
      if (!hash) logError('no hash provided to insertParent');
      if (!connection) logError('no connection provided to insertParent');
      return reject({ status: 500, error: 'Server Error' });
    }

    const { children, email, emailList } = body;

    if (!children || !children.length || !email) {
      logError(
        body,
        'Bad args in insertParent - should have been caught before this'
      );
      return reject({ status: 500, error: 'Server Error' });
    }

    const childCount = children.length;
    const month = 60 * 60 * 24 * 30 * 1000;
    const betaExpiration = month * 6;
    const expirationTime = betaExpiration;

    connection.query(
      `INSERT INTO parent (email, email_list, password, children_allowed, signup_utc, expiration_utc)
        VALUES(?,?,?,?,?,?)`,
      [
        email,
        emailList,
        hash,
        childCount,
        Date.now(),
        Date.now() + expirationTime
      ],
      (err, success) => {
        if (err) {
          logError(err, 'db error in insertParent #1');
          return reject({ status: 500, error: 'Server Error' });
        }

        if (!success || !success.insertId) {
          logError(success, 'no success || insertId from insertParent');
          return reject({ status: 500, error: 'Server Error' });
        }

        const parentId = success.insertId;
        let childrenLeftToInsert = childCount;
        const childArray = [];

        for (const child of children) {
          connection.query(
            'INSERT INTO children (parent_fk, username) VALUES (?,?)',
            [ parentId, child ],
            (err, success) => {
              if (err) {
                logError(err, 'db error in insertParent #2');
                return reject({ status: 500, error: 'Server Error' });
              }

              if (!success) {
                logError(success, 'no success || insertId from insertParent');
                return reject({ status: 500, error: 'Server Error' });
              }
              childArray.push({
                child_id: success.insertId, // eslint-disable-line
                username: child,
                coins: 0
              });
              childrenLeftToInsert--;
              if (childrenLeftToInsert === 0) {
                resolve({ parentId, childArray });
              }
            }
          );
        }
      }
    );
  });
}

module.exports = insertParent;
