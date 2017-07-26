import React from 'react';
import styled from 'styled-components';
import Help from './Help';
import MemoryHelpText from './helpText/MemoryHelpText';
import Spinner from './Spinner';
import {
  CoinImage,
  HelpButton,
  MuteButton,
  PageContainer,
  ScoreContainer
} from './GameStyles';

export default function MemoryPage(props) {
  const {
    coins,
    helpOpen,
    mute,
    score,
    showPrize,
    spinnerClassName,
    toggleHelp,
    toggleSound,
    wordList
  } = props;

  console.log(coins);

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

        <HelpButton
          src="/static/img/help.png"
          alt="Help"
          onClick={toggleHelp}
        />
      </PageContainer>
      <Help Body={MemoryHelpText} helpOpen={helpOpen} toggleHelp={toggleHelp} />
    </div>
  );
}
