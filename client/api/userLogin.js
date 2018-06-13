import { baseUserUrl } from './apiConfig';

function userLogin(body) {
  const myHeaders = new Headers({
    'Content-Type': 'application/json'
  });

  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: myHeaders
    };

    fetch(`${baseUserUrl}/login`, options)
      .then(res => {
        if (res.ok) return resolve(res.json());
        if (res.status === 401) {
          return reject('The Email Or Password You Entered Is Incorrect');
        }
        return reject('There Was An Error, Please Try Again');
      })
      .catch(() => reject('There Was An Error, Please Try Again'));
  });
}

export default userLogin;
