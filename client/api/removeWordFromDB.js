import { baseUserUrl } from './apiConfig';
import { getFromStorage } from '../utils/mswLocalStorage';

function removeWordFromDB(body) {
  return new Promise((resolve, reject) => {
    if (!body || !body.childId || !body.wordId) return reject('Bad Args');

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

    fetch(`${baseUserUrl}/removeWord`, options)
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
