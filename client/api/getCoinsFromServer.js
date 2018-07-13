import makeRequest from './makeRequest';

function getCoinsFromServer(childId) {
  return new Promise((resolve, reject) => {
    if (!childId) {
      console.log('no child id given to getCoinsFromServer');
      return reject('no child id');
    }
    const body = JSON.stringify({ childId });
    makeRequest('getCoins', body)
      .then(res => {
        return res.json();
      })
      .then(json => {
        console.log('coins is', json.coins);
        resolve(json.coins);
      })
      .catch(err => reject('error getting coins'));
  });
}

export default getCoinsFromServer;
