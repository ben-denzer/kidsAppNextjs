const getWordId = require('./getWordId');
const linkWordToChild = require('./linkWordToChild');

function addWordToDB(body, connection) {
  return new Promise((resolve, reject) => {
    const { childId, word } = body;
    if (!childId || !word) {
      logError(body, 'bad request to addWordToDB');
      return reject({ status: 400, error: 'Bad Request' });
    }

    if (!connection) {
      logError('no connection sent to addWordToDB');
      return reject({ status: 500, error: 'Server Error' });
    }

    getWordId(word, connection)
      .then(wordId => linkWordToChild(childId, wordId, connection))
      .then(wordId => resolve(wordId))
      .catch(err => {
        logError(err, 'error in addWordToDB');
        return reject(err);
      });
  });
}

module.exports = addWordToDB;
