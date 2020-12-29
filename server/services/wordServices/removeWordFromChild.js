function removeWordFromChild(body, connection) {
  return new Promise((resolve, reject) => {
    if (!body || !body.childId || !body.wordId) {
      logError(body, 'bad args given in removeWordFromChild');
      return reject({ status: 400, error: 'Bad Request' });
    }
    if (!connection) {
      logError('no connection given to removeWordFromChild');
      return reject({ status: 500, error: 'Server Error' });
    }

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
  });
}

module.exports = removeWordFromChild;
