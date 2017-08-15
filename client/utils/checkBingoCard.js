export default function checkBingoCard(x, y, wordArray, size) {
  return new Promise((resolve, reject) => {
    // Check the rows and columns first
    const fullRow = wordArray[y].filter(a => a.checked).length === size;
    const fullColumn = wordArray.filter(a => a[x].checked).length === size;
    if (fullRow || fullColumn) {
      resolve(true);
    }

    // Array of all diagonal words
    let leftToR = [];
    let rightToL = [];
    for (let i = 0; i < size; i++) {
      leftToR.push(wordArray[i][i]);
      rightToL.push(wordArray[i][size - i - 1]);
    }

    // check diagonal words
    const leftToRChecked = leftToR.filter(a => a.checked).length === size;
    const rightToLChecked = rightToL.filter(a => a.checked).length === size;
    if (leftToRChecked || rightToLChecked) {
      resolve(true);
    }

    resolve(false);
  });
}
