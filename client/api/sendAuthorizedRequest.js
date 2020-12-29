import { baseUserUrl } from './apiConfig';
import { getFromStorage } from '../utils/mswLocalStorage';

function sendAuthorizedRequest(
  url,
  body = JSON.stringify({}),
  method = 'POST'
) {
  const token = getFromStorage('token');
  if (!token) {
    throw new Error('no token');
  }

  // temp
  const reqBody = JSON.stringify(Object.assign(JSON.parse(body), { token }));

  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  });

  const options = {
    body: reqBody,
    headers,
    method
  };

  return fetch(`${baseUserUrl}/${url}`, options);
}

export default sendAuthorizedRequest;
