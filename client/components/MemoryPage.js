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
    cardList,
    coins,
    flipCard,
    helpOpen,
    mute,
    score,
    showPrize,
    spinnerClassName,
    toggleHelp,
    toggleSound,
    wordList
  } = props;

  const cards = cardList.map(a => {
    return (
      <Card
        key={a.cardId}
        className={a.status}
        data-cardId={a.cardId}
        onClick={flipCard}
      >
        <p>{a.word}</p>
      </Card>
    );
  });

  return (
    <div>
      <PageContainer>
        <CardContainer>
          {cards}
        </CardContainer>
        <Spinner spinnerClassName={spinnerClassName} />
        <MuteButton
          src={`/static/img/${mute ? 'mute' : 'unmute'}.png`}
          alt={`Turn Sound ${mute ? 'On' : 'Off'}`}
          onClick={toggleSound}
        />
        <ScoreContainer>
          {coins} <CoinImage src="/static/img/goldCoin.png" alt="Coins" />
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

const CardContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 75px;
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  height: 150px;
  width: 100px;
  margin: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  border-radius: 5px;

  &.faceDown {
    background-color: red;
    background-image: url("/static/img/cardBacks/cardBack-1.jpg");
    background-position: center;
    background-size: cover;

    p {
      display: none;
    }
  }

  &.faceUp {
    background-color: white;
  }

  &.hidden {
    opacity: .1;
    background-color: white;
  }
`;
