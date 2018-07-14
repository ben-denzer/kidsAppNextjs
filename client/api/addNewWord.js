import sendAuthorizedRequest from './sendAuthorizedRequest';

function addNewWord(body) {
  return new Promise((resolve, reject) => {
    if (!body || !body.childId || !body.word) return reject('Bad Args');

    sendAuthorizedRequest('addWord', JSON.stringify(body))
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        if (res.status === 401) {
          return reject(
            'Your Session Has Expired, Please Log Out And Log Back In'
          );
        }
        return reject('There Was An Error, Please Try Again');
      })
      .then(json => {
        if (json.wordId) {
          return resolve(json.wordId);
        }
        reject('There Was An Error, Please Try Again');
      })
      .catch(() => reject('There Was An Error, Please Try Again'));
  });
}

export default addNewWord;
