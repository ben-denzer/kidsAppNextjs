import React from 'react';
import Modal from '../Modal/Modal';
import SpeechHelpText from '../Modal/helpText/SpeechHelpText';
import Spinner from '../Spinner';
import {
  CoinImage,
  HelpButton,
  MuteButton,
  PageContainer,
  ScoreContainer
} from '../GameStyles';

import { SkipWordButton, WordContainer } from './SpeechPageStyles';
import { ErrorBox } from '../MainLayoutStyles';

function SpeechPage(props) {
  const {
    coins,
    currentWordIndex,
    error,
    helpOpen,
    mute,
    showPrize,
    shuffledWords,
    skipWord,
    spinnerClassName,
    toggleHelp,
    toggleSound
  } = props;

  const WordDisplay = showPrize
    ? <Spinner spinnerClassName={spinnerClassName} />
    : shuffledWords[currentWordIndex];

  return (
    <div>
      <PageContainer>
        {error && <ErrorBox>{error}</ErrorBox>}
        <MuteButton
          src={`/static/img/${mute ? 'mute' : 'unmute'}.png`}
          alt={`Turn Sound ${mute ? 'On' : 'Off'}`}
          onClick={toggleSound}
        />
        <ScoreContainer>
          {coins} <CoinImage src="/static/img/goldCoin.png" alt="Coins" />
        </ScoreContainer>
        <WordContainer className="preschoolFont">{WordDisplay}</WordContainer>
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
      <Modal
        Body={SpeechHelpText}
        modalOpen={helpOpen}
        toggleModal={toggleHelp}
      />
    </div>
  );
}

export default SpeechPage;
