import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { MIN_PASSWORD_LENGTH } from '../../globalConfig/globalConfig';
import checkForDuplicateEmail from './checkForDuplicateEmail';
import createUserToken from './createUserToken';
import hashPassword from './hashPassword';
import insertParentAndChildren from './insertParentAndChildren';
const waitTime = global.MSW_DEV ? 0 : 1000;

function verifyArgs(body) {
  return new Promise((resolve, reject) => {
    const { children, email, password, p2 } = body;
    if (
      !children.length || !email || !password || !p2

      || email.length < 6
      || email.length > 255
      || email.indexOf('@') === -1
      || email.indexOf('.') === -1
      || email.lastIndexOf('.') < email.indexOf('@') + 2
      || email.indexOf('@') !== email.lastIndexOf('@')
      || email.lastIndexOf('.') > email.length - 3

      || password.length < MIN_PASSWORD_LENGTH
      || password !== p2
    ) {
      logError(body, 'body in signup');
      return reject({ status: 400, error: 'Bad Request' });
    }
    resolve('valid');
  });
}

function signup(body, connection) {
  let children = [];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      verifyArgs(body)
        .then(() => checkForDuplicateEmail(body.email, connection))
        .then(() => hashPassword(body.password, bcrypt))
        .then(hash => insertParentAndChildren(body, hash, connection))
        .then(({ parentId, childArray }) => {
          children = childArray;
          return createUserToken(parentId, jwt);
        })
        .then(token => {
          const userData = { token, children };
          resolve(userData);
        })
        .catch(err => {
          logError(err || 'mystery error', 'in signup.js');
          return reject(err);
        });
    }, waitTime);
  });
}

export { verifyArgs };
export default signup;
