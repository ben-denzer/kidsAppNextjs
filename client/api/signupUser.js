import { baseUserUrl } from './apiConfig';
import { setInStorage } from '../utils/mswLocalStorage';

function signupUser(body) {
  const myHeaders = new Headers({
    'Content-Type': 'application/json'
  });

  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: myHeaders
    };

    fetch(`${baseUserUrl}/signup`, options)
      .then(res => {
        if (res.ok) return resolve(res.json())
        if (res.status === 401) return reject('Email Is Already In Use');
        return reject('There Was An Error, Please Try Again');
      })
      .catch(() => reject('There Was An Error, Please Try Again'));
  });
}

export default signupUser;
