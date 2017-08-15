import React from 'react';
import styled from 'styled-components';

export default function OnlineBingoPage(props) {
  const {
    activeWords,
    allWords,
    currentIndex,
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

  console.log(allWords, currentIndex, allWords[currentIndex]);
  const oldestWord = currentIndex > 6 ? currentIndex - 7 : 0;
  const alreadyCalled = allWords
    .slice(oldestWord, currentIndex)
    .reverse()
    .map(a => <OldWord key={a}>{a}</OldWord>);

  return (
    <div>
      <h1>Bingooooo</h1>
      <h2>{allWords[currentIndex]}</h2>
      <GameContainer>
        <BoxContainer>
          {allBoxes}
        </BoxContainer>
        <ListContainer>
          {alreadyCalled}
        </ListContainer>
      </GameContainer>
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

const GameContainer = styled.div`
  display: flex;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const OldWord = styled.div``;
