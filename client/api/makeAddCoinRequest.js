import sendAuthorizedRequest from './sendAuthorizedRequest';

function makeAddCoinRequest(body) {
  return new Promise((resolve, reject) => {
    sendAuthorizedRequest('addCoin', JSON.stringify(body))
      .then(res => {
        if (!res.ok) return console.log('bad response to addCoinToDB');
      })
      .catch(e => {
        console.log(e);
      });
  });
}

export default makeAddCoinRequest;
