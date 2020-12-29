import React from 'react';
import makeMemoryGrid from '../../utils/makeMemoryGrid';
import MemoryHelpText from '../Modal/helpText/MemoryHelpText';
import Modal from '../Modal/Modal';
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
    spinnerClassName,
    toggleHelp,
    toggleSound
  } = props;

  const options = { cardBack, cardList, flipCard, gameSize };
  const cards = makeMemoryGrid(options);

  return (
    <div>
      <PageContainer>
        <CardContainer>
          {cards}
        </CardContainer>
        <Spinner id="spinner" spinnerClassName={spinnerClassName} />
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
      <Modal
        Body={MemoryHelpText}
        modalOpen={helpOpen}
        toggleModal={toggleHelp}
      />
    </div>
  );
}
