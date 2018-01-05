function getWordId(word, connection) {
  return new Promise((resolve, reject) => {
    if (!word || !connection) {
      logError({ word, connection }, 'bad args to getWordId');
      return reject({ status: 500, error: 'Server Error' });
    }

    connection.query(
      'SELECT word_id FROM words WHERE word_text = ?',
      [ word ],
      (err, rows) => {
        if (err) {
          logError(err, 'DB Error in SELECT - getWordId');
          return reject({ status: 500, error: 'Server Error' });
        }

        if (rows.length) {
          return resolve(rows[0].word_id);
        }

        connection.query(
          'INSERT INTO words (word_text) VALUES (?)',
          [ word ],
          (err, success) => {
            if (err) {
              logError(err, 'DB Error in INSERT - getWordId');
              return reject({ status: 500, error: 'Server Error' });
            }

            resolve(success.insertId);
          }
        );
      }
    );
  });
}

export default getWordId;
