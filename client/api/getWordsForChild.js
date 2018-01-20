import { baseUserUrl } from './apiConfig';

function getWordsForChild(childId) {
  const myHeaders = new Headers({
    'Content-Type': 'application/json'
  });

  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(childId),
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
