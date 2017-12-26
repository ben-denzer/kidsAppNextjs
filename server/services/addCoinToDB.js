function addCoinToDB(body, connection) {
  return new Promise((resolve, reject) => {
    const { childId, coins } = body;
    if (!childId || !coins) {
      logError(body, 'bad request to addCoinToDB');
      return reject({ status: 400, error: 'Bad Request' });
    }
    if (!connection) {
      logError('no connection sent to addCoinToDB');
      return reject({ status: 500, error: 'Server Error' });
    }

    connection.query(
      'UPDATE children SET coins = ? WHERE child_id = ?',
      [ coins, childId ],
      (err, success) => {
        if (err || !success) {
          logError(err, 'db error in addCoinToDB');
          return reject({ status: 500, error: 'Server Error' });
        }
        resolve('ok');
      }
    );
  });
}

export default addCoinToDB;
