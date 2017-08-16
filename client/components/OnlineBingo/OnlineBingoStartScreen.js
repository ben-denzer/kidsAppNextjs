import React, { Component } from 'react';
import makeThumbnailGrid from '../../utils/makeThumbnailGrid';
import { PageContainer } from '../GameStyles';
import {
  CardBack,
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
        data-size={a[0]}
        className={`width${a[0]} ${a[0] === size ? 'active' : ''}`}
      >
        <OptionTitle>{`${a[0]} X ${a[1]}`}</OptionTitle>
        <div>{makeThumbnailGrid(a)}</div>
      </Option>
    );
  });

  const delayValues = [7, 10, 15, 20, 25, 30];
  const delayOptions = delayValues.map(a => (
    <DelayBox
      key={a}
      onClick={delayChange}
      data-time={a}
      className={a === delay ? 'active' : ''}
    >{`${a}sec`}</DelayBox>
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
