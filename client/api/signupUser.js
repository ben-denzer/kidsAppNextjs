import { baseUserUrl } from './apiConfig';

function signupUser(body) {
  console.log('body', body);
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
      .then(res => { if (res.ok) resolve() })
      .catch(err => reject(err));
  });
}

export default signupUser;
