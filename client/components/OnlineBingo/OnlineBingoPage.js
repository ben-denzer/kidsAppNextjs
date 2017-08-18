import React from 'react';
import Modal from '../Modal/Modal';
import Spinner from '../Spinner';

import {
  CoinImage,
  HelpButton,
  MuteButton,
  PageContainer,
  ScoreContainer,
  SettingsButton
} from '../GameStyles';

import {
  Box,
  BoxContainer,
  BoxRow,
  GameContainer,
  ListContainer,
  OldWord
} from './OnlineBingoPageStyles';

export default function OnlineBingoPage(props) {
  const {
    activeWords,
    allWords,
    coins,
    currentIndex,
    handleCheck,
    mute,
    noWinner,
    openOptions,
    paused,
    pauseGame,
    showPrize,
    size,
    spinnerClassName,
    toggleModal,
    toggleSound,
    wonGame
  } = props;

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
          src="/static/img/pauseButton.png"
          alt="Help"
          onClick={pauseGame}
        />
        <SettingsButton
          src="/static/img/settings.png"
          alt="Settings"
          onClick={openOptions}
        />
      </PageContainer>
      <Modal
        Body={() => (
          <div>
            <img
              src="/static/img/playButton.png"
              alt="Re Start"
              onClick={pauseGame}
            />
          </div>
        )}
        modalOpen={paused}
        small={true}
        toggleModal={pauseGame}
      />
    </div>
  );
}
