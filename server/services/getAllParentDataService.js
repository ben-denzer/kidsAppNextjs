const getAllData = require('./getAllData');

function getAllParentDataService(body, connection) {
  return new Promise((resolve, reject) => {
    if (!connection) {
      logError('no connection given to getAllParentDataService');
      return reject({ status: 500, error: 'Server Error' });
    }

    getAllData(body.userId, connection)
      .then(allData => resolve(allData))
      .catch(err => reject(err));
  });
}

module.exports = getAllParentDataService;
