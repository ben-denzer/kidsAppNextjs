export function getFromStorage(name) {
  const settings = JSON.parse(window.localStorage.getItem('mswSettings'));
  if (!settings || !settings[name]) return null;
  return settings[name];
}

export function setInStorage(name, val) {
  console.log(`setting ${name} to ${val}`)
  if (!name) throw new Error('bad request to setInStorage');
  const settings = JSON.parse(window.localStorage.getItem('mswSettings')) || {};

  const newSettings = Object.assign({}, settings, { [name]: val });
  window.localStorage.setItem('mswSettings', JSON.stringify(newSettings));
}
