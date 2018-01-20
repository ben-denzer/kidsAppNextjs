import jwt from 'jsonwebtoken';
import validateJwt from './validateJwt';
import getAllData from './getAllData';

function getAllParentDataService(body, connection) {
  return new Promise((resolve, reject) => {
    if (!body.token) return reject({ status: 400, error: 'Bad Request' });
    if (!connection) {
      logError('no connection given to getAllParentDataService');
      return reject({ status: 500, error: 'Server Error' });
    }

    validateJwt(body.token, jwt)
      .then(tokenBody => getAllData(tokenBody.userId, connection))
      .then(allData => resolve(allData))
      .catch(err => reject(err));
  });
}

export default getAllParentDataService;
