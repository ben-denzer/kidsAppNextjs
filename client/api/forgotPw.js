import { baseUserUrl } from './apiConfig';

function forgotPw(body) {
  body.apiUrl = window.location.origin || null;

  const myHeaders = new Headers({
    'Content-Type': 'application/json'
  });

  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: myHeaders
    };

    fetch(`${baseUserUrl}/forgotPw`, options)
      .then(res => {
        if (res.ok) return resolve();
        if (res.status === 401) { return reject('The Email Entered Is Not On File'); }
        return reject('There Was An Error, Please Try Again');
      })
      .catch(() => reject('There Was An Error, Please Try Again'));
  });
}

export default forgotPw;
