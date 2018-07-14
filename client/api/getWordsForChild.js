import sendAuthorizedRequest from './sendAuthorizedRequest';

function getWordsForChild(body) {
  return new Promise((resolve, reject) => {
    sendAuthorizedRequest('getWordsForChild', JSON.stringify(body))
      .then(res => {
        if (!res.ok) {
          console.log('bad response to getWordsForChild');
          return reject('error getting words');
        }
        resolve(res.json());
      })
      .catch(e => {
        console.log(e);
      });
  });
}

export default getWordsForChild;
