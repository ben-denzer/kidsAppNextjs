// this is only used to verify the user right now so the reject objects
// don't do anything - leaving them in because this function might 
// be useful somewhere else

function getUserFromEmail(email, connection) {
  return new Promise((resolve, reject) => {
    if (!email) {
      logError('no email provided to getUserFromEmail');
      return reject({ status: 500, error: 'no email given to getUserFromEmail' });
    }
    connection.query(
      'SELECT user_id, username, admin, email_list FROM users WHERE email = ?', // remove admin here
      [ email ],
      (err, rows) => {
        if (err) {
          logError(err, 'db error in getUserFromEmail #1');
          return reject({ status: 500, error: 'DB Error C32' });
        }
        if (!rows) {
          logError('no user found in getUserFromEmail');
          return reject({ status: 400, error: 'User Not Found' });
        }

        const user = { 
          userId: rows[0].user_id,
          username: rows[0].username,
          // admin: rows[0].admin
        };
        const emailList = rows[0].email_list;
        resolve({ user, emailList });
      }
    )
  });
}

module.exports = getUserFromEmail;
