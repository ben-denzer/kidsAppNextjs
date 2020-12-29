const validateAccountStatus = require('../validateAccountStatus');

function getAllWordsForChild(body, connection) {
  const { childId } = body;
  return new Promise((resolve, reject) => {
    if (!childId) {
      logError('no id sent to getAllWordsForChild');
      return reject({ status: 400, error: 'Bad Request' });
    }

    if (!connection) {
      logError('no connection sent to getAllWordsForChild');
      return reject({ status: 500, error: 'Server Error' });
    }

    validateAccountStatus(body, connection)
      .then(() => {
        connection.query(
          `SELECT w.word_id, w.word_text FROM words w
          INNER JOIN child_word_link c ON w.word_id = c.word_fk
          WHERE c.child_fk = ?
          `,
          [ childId ],
          (err, words) => {
            if (err) {
              logError(err, 'DB Error in getAllWordsForChild');
              return reject({ status: 500, error: 'Server Error' });
            }

            resolve(words);
          }
        );
      })
      .catch(e => reject(e));
  });
}

module.exports = getAllWordsForChild;
