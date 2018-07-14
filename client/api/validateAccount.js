import { setInStorage } from '../utils/mswLocalStorage';
import sendAuthorizedRequest from './sendAuthorizedRequest';

function validateAccount(body) {
  return new Promise((resolve, reject) => {
    sendAuthorizedRequest('validateAccount', JSON.stringify(body))
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
