import { baseUserUrl } from './apiConfig';
import { getFromStorage } from '../utils/mswLocalStorage';

function changePw(body) {
  return new Promise((resolve, reject) => {
    const myHeaders = new Headers({
      'Content-Type': 'application/json'
    });

    const token = getFromStorage('token');
    body = Object.assign(body, { token });

    const options = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: myHeaders
    };

    fetch(`${baseUserUrl}/changePw`, options)
      .then(res => {
        if (res.ok) return resolve('Success');
        if (res.status === 401) return reject('Your Current Password Is Incorrect');
        return reject('There Was An Error, Please Try Again');
      })
      .catch(() => reject('There Was An Error, Please Try Again'));
  });
}

export default changePw;
