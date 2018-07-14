import sendAuthorizedRequest from './sendAuthorizedRequest';

function removeWordFromDB(body) {
  return new Promise((resolve, reject) => {
    if (!body || !body.childId || !body.wordId) return reject('Bad Args');

    sendAuthorizedRequest('removeWord', JSON.stringify(body))
      .then(res => {
        if (res.ok) return resolve('Success');
        if (res.status === 401) {
          return reject(
            'Your Session Has Expired, Please Log Out And Log Back In'
          );
        }
        return reject('There Was An Error, Please Try Again');
      })
      .catch(() => reject('There Was An Error, Please Try Again'));
  });
}

export default removeWordFromDB;
