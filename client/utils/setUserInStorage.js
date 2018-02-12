import { setInStorage } from './mswLocalStorage';

function setUserInStorage(data, rememberMe) {
  const { children, email, password, token } = data;
  setInStorage('token', token);
  setInStorage('children', children);

  if (children.length === 1) {
    setInStorage('activeChild', children[0].child_id);
  }

  if (rememberMe) {
    setInStorage('email', email);
    setInStorage('password', password);
  } else {
    setInStorage('email', null);
    setInStorage('password', null);
  }
}

export default setUserInStorage;
