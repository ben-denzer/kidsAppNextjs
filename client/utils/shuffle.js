const shuffle = list => {
  let k = list.length;
  if (k === 0) {
    return false;
  } else {
    while (--k) {
      let m = Math.floor(Math.random() * (k + 1));
      let tempi = list[k];
      let tempj = list[m];
      list[k] = tempj;
      list[m] = tempi;
    }
  }
  return list;
};

export default shuffle;
