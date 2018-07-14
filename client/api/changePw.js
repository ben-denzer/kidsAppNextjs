import sendAuthorizedRequest from './sendAuthorizedRequest';

function changePw(body) {
  return new Promise((resolve, reject) => {
    sendAuthorizedRequest('changePw', JSON.stringify(body))
      .then(res => {
        if (res.ok) return resolve('Success');
        if (res.status === 401) {
          return reject('Your Current Password Is Incorrect');
        }
        return reject('There Was An Error, Please Try Again');
      })
      .catch(() => reject('There Was An Error, Please Try Again'));
  });
}

export default changePw;
