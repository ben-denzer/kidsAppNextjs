import React from 'react';
import styled from 'styled-components';

export default function OnlineBingoPage(props) {
  const {
    activeWords,
    handleCheck,
    noWinner,
    pauseGame,
    size,
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

  return (
    <div>
      <h1>Bingooooo</h1>
      <BoxContainer>
        {allBoxes}
      </BoxContainer>
    </div>
  );
}

const boxBorder = '1px solid black';

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  height: 60px;
  width: 60px;
  border-right: ${boxBorder};
  border-bottom: ${boxBorder};
  text-align: center;

  &:nth-child(1) {
    border-left: ${boxBorder};
  }

  &.checked {
    background: blue;
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

  @media (max-width: 550px) {
    height: 75px;
    width: 75px;
  }

  @media (max-width: 400px) {
    height: 60px;
    width: 60px;
    font-size: 14px;
  }
`;
