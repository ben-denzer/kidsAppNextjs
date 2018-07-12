import makeRequest from './makeRequest';

function getCoinsFromServer(activeChildId) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ activeChildId });
    makeRequest('getCoins', body)
      .then(res => {
        return res.json();
      })
      .then(json => {
        console.log(json);
        resolve(json.coins);
      })
      .catch(err => reject('error getting coins'));
  });
}

export default getCoinsFromServer;
