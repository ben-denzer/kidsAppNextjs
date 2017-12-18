import { MIN_PASSWORD_LENGTH } from '../../globalConfig/globalConfig';
import { baseUserUrl } from './apiConfig';

function resetPw(body) {
  return new Promise((resolve, reject) => {
    const { password, p2 } = body;
    if (password.length < MIN_PASSWORD_LENGTH) {
      return reject('Password Must Be At Least 7 Characters Long');
    } else if (password !== p2) {
      return reject('Passwords Do Not Match');
    }

    body.token = window.location.search.slice(1);
    const myHeaders = new Headers({
      'Content-Type': 'application/json'
    });

    const options = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: myHeaders
    };

    fetch(`${baseUserUrl}/resetPw`, options)
    .then(res => {
      if (res.ok) return resolve()
      return reject('There Was An Error, Please Try Again');
    })
    .catch(() => reject('There Was An Error, Please Try Again'));
  });
}

export default resetPw;
