import { baseUserUrl } from './apiConfig';
import { setInStorage } from '../utils/mswLocalStorage';

function validateAccount(body) {
  const myHeaders = new Headers({
    'Content-Type': 'application/json'
  });

  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: myHeaders
    };

    fetch(`${baseUserUrl}/validateAccount`, options)
      .then(res => {
        if (res.status === 401) {
          setInStorage('token', null);
          window.location = '/account/login';
          return reject({ membershipValid: false });
        }
        if (res.status === 403) {
          return resolve({ membershipValid: false });
        }
        if (res.ok) {
          return res.json();
        }
      })
      .then(json => {
        if (json.membershipValid) {
          return resolve({ membershipValid: true });
        }
        console.log(json, 'unknown error');
        setInStorage('token', null);
        window.location = '/account/login';
        return reject({ membershipValid: false });

      })
      .catch(() => reject('There Was An Error, Please Try Again'));
  });
}

export default validateAccount;
