import { baseUserUrl } from './apiConfig';

function addCoinToDB(body) {
  const myHeaders = new Headers({
    'Content-Type': 'application/json'
  });

  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: myHeaders
    };

    fetch(`${baseUserUrl}/addCoin`, options)
      .then(res => {
        if (!res.ok) return console.log('bad response to addCoinToDB')
      }).catch(e => { console.log(e) });
  });
}

export default addCoinToDB;
