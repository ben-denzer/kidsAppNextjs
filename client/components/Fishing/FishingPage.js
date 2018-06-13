import React from 'react';
import Spinner from '../Spinner';

import {
  CoinImage,
  MuteButton,
  PageContainer,
  ScoreContainer
} from '../GameStyles';

import { AboveWater, BelowWater, Fish, FishingBox } from './FishingStyles';

const FishingPage = props => {
  const {
    coins,
    currentIndex,
    fishOnBoard,
    handleUserChoice,
    mute,
    spinnerClassName,
    toggleSound
  } = props;
  const currentWord = fishOnBoard[currentIndex];

  const choices = fishOnBoard.map((a, i) =>
    <Fish
      key={a}
      className={`fish-${i}`}
      onClick={handleUserChoice}
      data-word-text={a}
    >
      <span>{a}</span>
    </Fish>
  );

  return (
    <PageContainer>
      <Spinner spinnerClassName={spinnerClassName} />
      <MuteButton
        src={`/static/img/${mute ? 'mute' : 'unmute'}.png`}
        alt={`Turn Sound ${mute ? 'On' : 'Off'}`}
        onClick={toggleSound}
      />
      <ScoreContainer>
        {coins} <CoinImage src="/static/img/goldCoin.png" alt="Coins" />
      </ScoreContainer>
      <FishingBox>
        <AboveWater>
          <h1>{currentWord}</h1>
        </AboveWater>
        <BelowWater>
          {choices}
        </BelowWater>
      </FishingBox>
    </PageContainer>
  );
};

export default FishingPage;
