import React from 'react';
import styled from 'styled-components';
import { color2 } from '../../config/globalStyles';
import MemoryHelpText from '../Help/helpText/MemoryHelpText';
import Help from '../Help/Help';
import Spinner from '../Spinner';
import {
  CoinImage,
  HelpButton,
  MuteButton,
  PageContainer,
  ScoreContainer,
  SettingsButton
} from '../GameStyles';

export default function OnlineBingoPage(props) {
  const {
    activeWords,
    allWords,
    coins,
    currentIndex,
    handleCheck,
    helpOpen,
    mute,
    noWinner,
    openOptions,
    pauseGame,
    showPrize,
    size,
    spinnerClassName,
    toggleHelp,
    toggleSound,
    wonGame
  } = props;

  if (wonGame) {
    return <div>WINNER</div>;
  }

  let allBoxes = [];
  for (let i = 0; i < activeWords.length; i++) {
    const row = activeWords[i].map(a => (
      <Box
        key={a.word}
        className={a.checked ? 'checked' : ''}
        data-word={a.word}
        data-x={a.x}
        data-y={a.y}
        onClick={handleCheck}
      >
        {a.word}
      </Box>
    ));
    allBoxes.push(<BoxRow key={i}>{row}</BoxRow>);
  }

  const oldestWord = currentIndex > 6 ? currentIndex - 7 : 0;
  const alreadyCalled = allWords
    .slice(oldestWord, currentIndex + 1)
    .reverse()
    .map(a => <OldWord key={a}>{a}</OldWord>);

  return (
    <div>
      <PageContainer>
        <GameContainer>
          <BoxContainer>
            {allBoxes}
          </BoxContainer>
          <ListContainer>
            {alreadyCalled}
          </ListContainer>
        </GameContainer>
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
        <SettingsButton
          src="/static/img/settings.png"
          alt="Settings"
          onClick={openOptions}
        />
      </PageContainer>
      <Help Body={MemoryHelpText} helpOpen={helpOpen} toggleHelp={toggleHelp} />
    </div>
  );
}

const boxBorder = '1px solid black';

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 767px) {
    margin-bottom: 100px;
  }
`;

const BoxRow = styled.div`
  display: flex;

  &:nth-child(1) {
    border-top: ${boxBorder};
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  height: 75px;
  width: 75px;
  border-right: ${boxBorder};
  border-bottom: ${boxBorder};
  text-align: center;

  &:nth-child(1) {
    border-left: ${boxBorder};
  }

  &.checked {
    background: ${color2};
    color: white;

    &:hover {
      opacity: 1;
      cursor: default;
    }
  }

  &:hover {
    cursor: pointer;
    opacity: .8;
  }

  @media (max-width: 400px) {
    height: 60px;
    width: 60px;
    font-size: 14px;
  }
`;

const GameContainer = styled.div`
  display: flex;

  @media (max-width: 767px) {
    flex-direction: column-reverse;
  }
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 50px;
  min-width: 150px;

  @media (max-width: 767px) {
    padding-left: 0;
    align-items: center;
  }
`;

const OldWord = styled.div`
  font-size: 18px;
  
  @media (max-width: 767px) {
    display: none;
  }

  &:first-child {
    display: block;
    margin-bottom: 50px;
    font-size: 48px;
    font-weight: bold;

    @media (max-width: 767px) {
      margin-bottom: 20px;
    }
  }
`;
