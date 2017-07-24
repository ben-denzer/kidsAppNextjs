import React from 'react';
import Help from './Help';
import speechHelpText from '../helpText/speechPageHelpText';
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
    helpOpen,
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
    <div>
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
        <HelpButton
          src="/static/img/help.png"
          alt="Help"
          onClick={toggleHelp}
        />
        <SkipWordButton
          src="/static/img/arrow.png"
          alt="Skip Word"
          onClick={skipWord}
        />
      </PageContainer>
      <Help
        title={'Help'}
        body={speechHelpText}
        helpOpen={helpOpen}
        toggleHelp={toggleHelp}
      />
    </div>
  );
}

export default SpeechPage;
