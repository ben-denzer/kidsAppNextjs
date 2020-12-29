function linkWordToChild(childId, wordId, connection) {
  return new Promise((resolve, reject) => {
    if (!childId || !wordId || !connection) {
      logError({ childId, wordId, connection }, 'bad args to linkWordToChild');
      return reject({ status: 500, error: 'Server Error' });
    }

    connection.query(
      'INSERT INTO child_word_link (child_fk, word_fk) VALUES (?, ?)',
      [ childId, wordId ],
      err => {
        if (err) {
          logError(err, 'db error in linkWordToChild');
          return reject({ status: 500, error: 'Server Error' });
        }

        resolve(wordId);
      }
    );
  });
}

module.exports = linkWordToChild;
