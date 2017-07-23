import React from 'react';

function SpeechPageView(props) {
  const { coins, currentWordIndex, listen, score, wordList } = props;
  return (
    <div>
      <h1>{wordList[currentWordIndex]}</h1>
      <h2>{coins} Coins</h2>
      <button onClick={listen}>Start</button>
    </div>
  );
}

export default SpeechPageView;
