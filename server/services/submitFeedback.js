function submitFeedback(options, connection) {
  const { name, email, comment } = options;
  return new Promise((resolve, reject) => {
    if (!comment) {
      logError('no comment provided to submitFeedback');
      return reject({ status: 400, error: 'Bad Request' });
    }
    connection.query(
      'INSERT INTO feedback (name, email, comment) VALUES (?,?,?)',
      [ name, email, comment ],
      (err, success) => {
        if (err) {
          logError(err, 'db error in submitFeedback #1');
          return reject({ status: 500, error: 'server error 88' });
        }
        resolve();
      }
    )
  });
}

module.exports = submitFeedback;
