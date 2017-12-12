import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

function login(body, connection) {
  return new Promise((resolve, reject) => {
    if (!body || !body.email || !body.password) {
      logError(body, 'Invalid body in login.js - shouldnt have gotten this far');
      reject({ status: 500, error: 'Server Error' });
    }
    if (!connection) {
      logError('No connection passed to login.js');
      reject({ status: 500, error: 'Server Error' });
    }

    let userData = {};
    verifyPassword(body.email, bcrypt, connection)
      .then(userId => findChildren(userId, connection))
      .then(({ children, userId }) => {
        userData.children = children;
        return createJwt(userId, jwt);
      })
      .then(token => {
        userData.token = token;
        resolve(userData);
      })
      .catch(err => {
        logError(err, 'in login.js');
        reject({ status: 500, error: 'Server Error' });
      })
  });
}

export default login;
