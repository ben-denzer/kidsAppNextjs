import { baseUserUrl } from './apiConfig';
import { getFromStorage } from '../utils/mswLocalStorage';

function makeRequest(url, body, method = 'POST') {
  const token = getFromStorage('token');

  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  });

  if (typeof body !== 'string') {
    body = JSON.stringify(body);
  }

  const options = {
    body,
    headers,
    method
  };

  return fetch(`${baseUserUrl}/${url}`, options);
}

export default makeRequest;
