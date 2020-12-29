import React from 'react';
import makeThumbnailGrid from '../../utils/makeThumbnailGrid';
import { PageContainer } from '../GameStyles';
import {
  CardBack,
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
    gameSize,
    optionsOpen,
    setupCards,
    sizeChange,
    openOptions
  } = props;

  if (!optionsOpen) {
    return (
      <PageContainer>
        <RestartContainer onClick={setupCards}>
          <Title>Play Again?</Title>
          <Restart src="/static/img/restart.png" alt="Restart" />
        </RestartContainer>
        <ChangeSettings onClick={openOptions}>
          Change Settings
        </ChangeSettings>
      </PageContainer>
    );
  }

  const sizeOptions = [
    [ 2, 4 ],
    [ 4, 2 ],
    [ 2, 5 ],
    [ 5, 2 ],
    [ 4, 3 ],
    [ 3, 4 ],
    [ 4, 4 ],
    [ 5, 4 ],
    [ 4, 5 ]
  ];
  const gameOptions = sizeOptions.map(a =>
    <Option
      key={a[0].toString() + a[1].toString()}
      onClick={() => sizeChange(a)}
      className={`width${a[0]} ${a[0] === gameSize[0] && a[1] === gameSize[1] ? 'active' : ''}`}
    >
      <OptionTitle>{`${a[0]} X ${a[1]}`}</OptionTitle>
      <div>{makeThumbnailGrid(a, cardBack)}</div>
      <OptionHeadline>{`${a[0] * a[1] / 2} Words`}</OptionHeadline>
    </Option>
  );

  const cardBackOptions = [ 1, 2, 3, 4 ];
  const cardOptions = cardBackOptions.map(a =>
    <CardBack
      key={a}
      className={Number(a) === Number(cardBack) ? 'active' : ''}
      data-cardid={`card-${a}`}
      style={{
        backgroundImage: `url('/static/img/cardBacks/cardBack-${a}.jpg')`
      }}
    />
  );

  return (
    <PageContainer>
      <Title>Size</Title>
      <OptionsContainer>
        {gameOptions}
      </OptionsContainer>
      <Title>Cards</Title>
      <OptionsContainer onClick={cardChange}>
        {cardOptions}
      </OptionsContainer>
      <StartGame onClick={setupCards}>START</StartGame>
    </PageContainer>
  );
}

export default MemoryStartScreen;
