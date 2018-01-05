import jwt from 'jsonwebtoken';
import getWordId from './getWordId';
import linkWordToChild from './linkWordToChild';
import validateJwt from '../validateJwt';

function addWordToDB(body, connection) {
  return new Promise((resolve, reject) => {
    const { childId, token, word } = body;
    if (!childId || !token || !word) {
      logError(body, 'bad request to addWordToDB');
      return reject({ status: 400, error: 'Bad Request' });
    }

    if (!connection) {
      logError('no connection sent to addWordToDB');
      return reject({ status: 500, error: 'Server Error' });
    }

    validateJwt(token, jwt)
      .then(() => getWordId(word, connection))
      .then(wordId => linkWordToChild(childId, wordId, connection))
      .then(() => resolve())
      .catch(err => {
        logError(err, 'error in addWordToDB');
        return reject(err);
      });
  });
}

export default addWordToDB;
