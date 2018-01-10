function getAllWordsForChild(id, connection) {
  return new Promise((resolve, reject) => {
    if (!id) {
      logError('no id sent to getAllWordsForChild');
      return reject({ status: 400, error: 'Bad Request' });
    }

    if (!connection) {
      logError('no connection sent to getAllWordsForChild');
      return reject({ status: 500, error: 'Server Error' });
    }

    connection.query(
      `SELECT w.word_id, w.word_text FROM words w
       INNER JOIN child_word_link c ON w.word_id = c.word_fk
       WHERE c.child_fk = ?
      `,
      [ id ],
      (err, words) => {
        if (err) {
          logError(err, 'DB Error in getAllWordsForChild');
          return reject({ status: 500, error: 'Server Error' });
        }

        resolve(words);
      }
    );
  });
}

export default getAllWordsForChild;
