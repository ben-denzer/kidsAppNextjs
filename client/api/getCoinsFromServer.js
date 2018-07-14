import sendAuthorizedRequest from './sendAuthorizedRequest';

function getCoinsFromServer(childId) {
  return new Promise((resolve, reject) => {
    if (!childId) {
      return reject('no child id');
    }
    const body = JSON.stringify({ childId });
    sendAuthorizedRequest('getCoins', body)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return reject('network error');

      })
      .then(json => {
        resolve(json.coins);
      })
      .catch(err => reject('error getting coins'));
  });
}

export default getCoinsFromServer;
