function getAllData(parentId, connection) {
  return new Promise((resolve, reject) => {
    if (!parentId || !connection) {
      logError(
        { parentId, connection },
        'No parentId || connection provided to getAllData'
      );
      return reject({ status: 500, error: 'Server Error' });
    }

    connection.query(
      `SELECT p.parent_id, p.email, p.children_allowed, p.email_list, p.signup_utc,
       p.expiration_utc, c.child_id, c.username FROM parent p INNER JOIN children c
       ON p.parent_id = c.parent_fk WHERE p.parent_id = ?`,
      [ parentId ],
      (err, data) => {
        if (err) {
          logError(err, 'DB Error in getAllData');
          return reject({ status: 500, error: 'Server Error' });
        }
        if (!data.length) {
          logError(err, 'No User Returned from getAllData');
          return reject({ status: 401, error: 'Unauthorized' });
        }
        resolve(data);
      }
    );
  });
}

module.exports = getAllData;
