import { baseUserUrl } from './apiConfig';
import { getFromStorage } from '../utils/mswLocalStorage';

function getAllParentData() {
  const myHeaders = new Headers({
    'Content-Type': 'application/json'
  });

  return new Promise((resolve, reject) => {
    const token = getFromStorage('token');
    if (!token) {
      window.location = '/account/login';
      return;
    }

    const options = {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: myHeaders
    };

    fetch(`${baseUserUrl}/getAllParentData`, options)
      .then(res => {
        if (!res.ok) {
          if (res.status === 500) return reject('Server Error');
          if (res.status === 400 || res.status === 401) {
            window.location = '/account/login';
            return;
          }
        }
        resolve(res.json());
      })
      .catch(e => reject('There Was An Error, Please Try Again'));
  });
}

export default getAllParentData;
