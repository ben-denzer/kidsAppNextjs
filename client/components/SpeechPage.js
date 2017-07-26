import React from 'react';
import Help from './Help';
import SpeechHelpText from './helpText/SpeechHelpText';
import Spinner from './Spinner';
import {
  CoinImage,
  HelpButton,
  MuteButton,
  PageContainer,
  ScoreContainer,
  SkipWordButton,
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
    spinnerClassName,
    toggleHelp,
    toggleSound,
    url,
    wordList
  } = props;

  const WordDisplay = showPrize
    ? <Spinner
        src="/static/img/spinningQuarter.gif-c200"
        alt="Success!"
        spinnerClassName={spinnerClassName}
      />
    : wordList[currentWordIndex];

  return (
    <div>
      <PageContainer>
        <MuteButton
          src={`/static/img/${mute ? 'mute' : 'unmute'}.png`}
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
      <Help Body={SpeechHelpText} helpOpen={helpOpen} toggleHelp={toggleHelp} />
    </div>
  );
}

export default SpeechPage;
