export function getFromStorage(name) {
  const settings = JSON.parse(window.localStorage.getItem('mswSettings'));
  if (!settings || !settings.length) return null;

  const filteredSettings = settings.filter(a => a.name === name);
  if (!filteredSettings || !filteredSettings.length) return null;

  return filteredSettings[0].val;
}

export function setInStorage(name, val) {
  if (!name) throw new Error('bad request to setInStorage');
  let newSettings = null;

  const settings = JSON.parse(window.localStorage.getItem('mswSettings'));
  if (!settings || !settings.length) {
    newSettings = [{ name, val }];
    window.localStorage.setItem('mswSettings', JSON.stringify(newSettings));
    return;
  }

  const filteredSettings = settings.filter(a => a.name === name);
  if (!filteredSettings.length) {
    newSettings = [...settings, { name, val }];
  } else {
    newSettings = settings.map(a => a.name === name ? { name, val } : a);
  }
  window.localStorage.setItem('mswSettings', JSON.stringify(newSettings));
} 
