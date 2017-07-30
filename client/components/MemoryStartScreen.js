import React, { Component } from 'react';
import makeThumbnailGrid from '../utils/makeThumbnailGrid';
import { PageContainer } from './GameStyles';
import {
  ChangeSettings,
  Option,
  OptionHeadline,
  OptionsContainer,
  OptionTitle,
  Restart,
  RestartContainer,
  StartGame,
  Title
} from './MemoryStartScreenStyles';

function MemoryStartScreen(props) {
  const {
    cardBack,
    cardChange,
    gameOver,
    gameSize,
    optionsOpen,
    setupCards,
    setupGame,
    sizeChange,
    toggleOptions
  } = props;

  if (!optionsOpen) {
    return (
      <PageContainer>
        <RestartContainer onClick={setupCards}>
          <Title>Play Again?</Title>
          <Restart src="/static/img/restart.png" alt="Restart" />
        </RestartContainer>
        <ChangeSettings onClick={toggleOptions}>
          Change Settings
        </ChangeSettings>
      </PageContainer>
    );
  }

  const sizeOptions = [[4, 2], [5, 2], [4, 3], [3, 4], [4, 4], [5, 4], [4, 5]];

  const options = sizeOptions.map(a => (
    <Option
      key={a[0].toString() + a[1].toString()}
      onClick={() => sizeChange(a)}
      className={a[0] === gameSize[0] && a[1] === gameSize[1] ? 'active' : ''}
    >
      <OptionTitle>{`${a[0]} X ${a[1]}`}</OptionTitle>
      <div>{makeThumbnailGrid(a, cardBack)}</div>
      <OptionHeadline>{`${a[0] * a[1] / 2} Words`}</OptionHeadline>
    </Option>
  ));

  return (
    <PageContainer>
      <Title>Options</Title>
      <OptionsContainer>
        {options}
      </OptionsContainer>
      <StartGame onClick={setupCards}>START</StartGame>
    </PageContainer>
  );
}

export default MemoryStartScreen;
