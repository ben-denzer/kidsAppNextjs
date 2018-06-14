function addTempCoin() {
  const coins = window.sessionStorage.getItem('tempUserCoins');
  if (!coins) {
    window.sessionStorage.setItem('tempUserCoins', 1);
    return;
  }
  window.sessionStorage.setItem('tempUserCoins', Number(coins) + 1);
}

function getTempCoins() {
  const coins = window.sessionStorage.getItem('tempUserCoins');
  if (coins) {
    return coins;
  }
  window.sessionStorage.setItem('tempUserCoins', 0);
  return 0;
}

export { addTempCoin, getTempCoins };
