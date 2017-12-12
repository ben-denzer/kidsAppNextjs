import { setInStorage } from './mswLocalStorage';

function setUserInStorage(data) {
  const { token, children } = data;
  setInStorage('token', token);
  setInStorage('children', children);
}

export default setUserInStorage;
