import React, { Component } from 'react';
import makeThumbnailGrid from '../../utils/makeThumbnailGrid';
import { PageContainer } from '../GameStyles';
import {
  ChangeSettings,
  DelayBox,
  Option,
  OptionHeadline,
  OptionsContainer,
  OptionTitle,
  Restart,
  RestartContainer,
  StartGame,
  Title
} from './OnlineBingoStartScreenStyles';

function OnlineBingoStartScreen(props) {
  const {
    delay,
    delayChange,
    optionsOpen,
    size,
    sizeChange,
    startGame,
    openOptions
  } = props;

  if (!optionsOpen) {
    return (
      <PageContainer>
        <RestartContainer onClick={startGame}>
          <Title>Play Again?</Title>
          <Restart src="/static/img/restart.png" alt="Restart" />
        </RestartContainer>
        <ChangeSettings onClick={openOptions}>
          Change Settings
        </ChangeSettings>
      </PageContainer>
    );
  }

  const sizeOptions = [[3, 3], [5, 5], [7, 7]];
  const gameOptions = sizeOptions.map(a => {
    return (
      <Option
        key={a[0].toString() + a[1].toString()}
        onClick={() => sizeChange(a[0])}
        className={`width${a[0]} ${a[0] === size ? 'active' : ''}`}
      >
        <OptionTitle>{`${a[0]} X ${a[1]}`}</OptionTitle>
      </Option>
    );
  });

  const delayValues = [7, 10, 15, 20, 25, 30];
  const delayOptions = delayValues.map(a => (
    <Option
      key={a}
      onClick={() => delayChange(a)}
      data-time={a}
      className={a === delay ? 'active' : ''}
    >
      <OptionTitle>{`${a}sec`}</OptionTitle>
    </Option>
  ));

  return (
    <PageContainer>
      <Title>Size</Title>
      <OptionsContainer>
        {gameOptions}
      </OptionsContainer>
      <Title>Time Between Words</Title>
      <OptionsContainer>
        {delayOptions}
      </OptionsContainer>
      <StartGame onClick={startGame}>START</StartGame>
    </PageContainer>
  );
}

export default OnlineBingoStartScreen;
