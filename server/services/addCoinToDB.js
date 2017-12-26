/* eslint-disable */

function addCoinToDB(body, connection) {
  return new Promise((resolve, reject) => {
    const { childId, coins, token } = body;
    if (!childId || !coins || !token) return reject({ status: 400, error: 'Bad Request' });
    resolve('ok');
  });
}

export default addCoinToDB;
