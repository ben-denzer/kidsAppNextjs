import React from 'react';
import {
  CoinImage,
  HelpButton,
  MuteButton,
  PageContainer,
  ScoreContainer,
  SkipWordButton,
  Spinner,
  WordContainer
} from './SpeechPageStyles';

function SpeechPage(props) {
  const {
    coins,
    currentWordIndex,
    listen,
    mute,
    score,
    showPrize,
    skipWord,
    toggleHelp,
    toggleSound,
    wordList
  } = props;

  const WordDisplay = showPrize
    ? <Spinner src="/static/img/spinningQuarter.gif-c200" alt="Success!" />
    : wordList[currentWordIndex];

  return (
    <PageContainer>
      <MuteButton
        src={`/static/img/${mute ? 'unmute' : 'mute'}.png`}
        alt={`Turn Sound ${mute ? 'On' : 'Off'}`}
        onClick={toggleSound}
      />
      <ScoreContainer>
        {coins} <CoinImage src="/static/img/quarter.png" alt="Coins" />
      </ScoreContainer>
      <WordContainer>
        {WordDisplay}
      </WordContainer>
      <HelpButton src="/static/img/help.png" alt="Help" onClick={toggleHelp} />
      <SkipWordButton
        src="/static/img/arrow.png"
        alt="Skip Word"
        onClick={skipWord}
      />
    </PageContainer>
  );
}

export default SpeechPage;
