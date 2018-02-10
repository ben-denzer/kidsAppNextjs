import { baseUserUrl } from './apiConfig';
import { getFromStorage } from '../utils/mswLocalStorage';

function getWordsForChild(body) {
  const myHeaders = new Headers({
    'Content-Type': 'application/json'
  });

  const token = getFromStorage('token');
  body = Object.assign({}, body, { token });

  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: myHeaders
    };

    fetch(`${baseUserUrl}/getWordsForChild`, options)
      .then(res => {
        if (!res.ok) return console.log('bad response to getWordsForChild');
        resolve(res.json());
      }).catch(e => { console.log(e) });
  });
}

export default getWordsForChild;
