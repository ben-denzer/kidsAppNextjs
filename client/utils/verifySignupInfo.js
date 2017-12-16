import { MIN_PASSWORD_LENGTH } from '../../globalConfig/globalConfig';

function verifySignupInfo(data) {
  return new Promise((resolve, reject) => {
    const { childCount, children, email, password, p2 } = data;

    if (email.length < 5 || email.length > 255) return reject('Invalid Email');
    if (email.indexOf('@') === -1) return reject('Invalid Email');
    if (email.indexOf('.') === -1) return reject('Invalid Email');
    if (email.lastIndexOf('.') < email.indexOf('@')) return reject('Invalid Email');
    if (email.indexOf('@') !== email.lastIndexOf('@')) return reject('Invalid Email');
    if (email.lastIndexOf('.') > email.length - 2) return reject('Invalid Email');

    if (!password) return reject('Please Enter Password');
    if (password.length < MIN_PASSWORD_LENGTH) reject('Password Is Too Short');
    if (!p2) return reject('Please Re-Enter Password');
    if (password !== data.p2) return reject('Passwords Do Not Match');

    if (childCount <= 0) return reject('You Must Have At Least 1 Child Account');

    for (let i = 0; i < childCount; i++) {
      if (!children[i]) return reject('Please Enter A Name For Each Child');
    }

    resolve();
  });
}

export default verifySignupInfo;
