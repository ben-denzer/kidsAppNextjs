import { baseUserUrl } from './apiConfig';
import { getFromStorage } from '../utils/mswLocalStorage';

function addNewWord(body) {
  return new Promise((resolve, reject) => {
    if (!body || !body.childId || !body.word) return reject('Bad Args');

    const token = getFromStorage('token');
    if (!token) return reject('No Token');
    body = Object.assign(body, { token });

    const myHeaders = new Headers({
      'Content-Type': 'application/json'
    });

    const options = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: myHeaders
    };

    fetch(`${baseUserUrl}/addWord`, options)
      .then(res => {
        if (res.ok) return resolve('Success');
        if (res.status === 401) return reject('Your Session Has Expired, Please Log Out And Log Back In');
        return reject('There Was An Error, Please Try Again');
      })
      .catch(() => reject('There Was An Error, Please Try Again'));
  });
}

export default addNewWord;
