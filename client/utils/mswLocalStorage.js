export function getFromStorage(name) {
  const settings = JSON.parse(window.localStorage.getItem('mswSettings'));
  console.log('getting from settings', settings);
  if (!settings || !settings[name]) return null;
  console.log('settings[name] = ', settings[name])
  return settings[name];
}

export function setInStorage(name, val) {
  if (!name) throw new Error('bad request to setInStorage');
  const settings = JSON.parse(window.localStorage.getItem('mswSettings')) || {};

  const newSettings = Object.assign({}, settings, { [name]: val });
  window.localStorage.setItem('mswSettings', JSON.stringify(newSettings));
}
