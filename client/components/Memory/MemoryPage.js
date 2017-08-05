import React from 'react';
import makeMemoryGrid from '../../utils/makeMemoryGrid';
import MemoryHelpText from '../Help/helpText/MemoryHelpText';
import Help from '../Help/Help';
import Spinner from '../Spinner';
import { CardContainer } from './MemoryPageStyles';
import {
  CoinImage,
  HelpButton,
  MuteButton,
  PageContainer,
  ScoreContainer,
  SettingsButton
} from '../GameStyles';

export default function MemoryPage(props) {
  const {
    cardBack,
    cardList,
    coins,
    flipCard,
    gameSize,
    helpOpen,
    mute,
    openOptions,
    score,
    showPrize,
    spinnerClassName,
    toggleHelp,
    toggleSound,
    wordList
  } = props;

  const options = { cardBack, cardList, flipCard, gameSize };
  const cards = makeMemoryGrid(options);

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
