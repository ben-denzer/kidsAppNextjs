const jwt = require('jsonwebtoken');
const validateJwt = require('../validateJwt');

function removeWordFromChild(body, connection) {
  return new Promise((resolve, reject) => {
    if (!body || !body.token || !body.childId || !body.wordId) {
      logError(body, 'bad args given in removeWordFromChild');
      return reject({ status: 400, error: 'Bad Request' });
    }
    if (!connection) {
      logError('no connection given to removeWordFromChild');
      return reject({ status: 500, error: 'Server Error' });
    }

    validateJwt(body.token, jwt)
      .then(() => {
        connection.query(
          'DELETE FROM child_word_link WHERE child_fk = ? AND word_fk = ?',
          [ body.childId, body.wordId ],
          err => {
            if (err) {
              logError(err, 'db error in removeWordFromChild');
              return reject({ status: 500, error: 'Server Error' });
            }
            resolve({ success: true });
          }
        );
      })
      .catch(err => {
        logError(err, 'removeWordFromChild - in catch');
        return reject(err || { status: 500, error: 'Server Error' });
      });
  });
}

module.exports = removeWordFromChild;
