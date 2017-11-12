import React from 'react';
import styled from 'styled-components';

const FishingPage = (props) => {
  const { currentIndex, fishOnBoard, handleUserChoice } = props;
  const currentWord = fishOnBoard[currentIndex];

  const choices = fishOnBoard.map((a, i) => (
    <Fish
      key={a}
      className={`fish-${i}`}
      onClick={handleUserChoice}
    >
      {a}
    </Fish>
  ));

  return (
    <World>
      <AboveWater>
        <h1>{currentWord}</h1>
      </AboveWater>
      <BelowWater>
        {choices}
      </BelowWater>
    </World>
  );
};

const AboveWater = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 275px;
`;

const BelowWater = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 100px;
`;

const tailBorder = '35px';

const tail = (color) => `
  position: absolute;
  content: "";
  width: ${tailBorder};
  height: ${tailBorder * 2};
  border-left: solid ${tailBorder} ${color};
  border-bottom: solid ${tailBorder} transparent;
  border-top: solid ${tailBorder} transparent;
  margin-left: -55px;
`;

const Fish = styled.div`
  height: 75px;
  min-width: 150px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  position: relative;
  transition: transform .5s ease-in-out, margin 2s ease-in-out;

  &:hover {
    cursor: pointer;
    opacity: .9;
  }

  &:after {
    content: "";
    position: absolute;
    top: ${parseInt(tailBorder) - 10}px;
    right: 30px;
    height: 5px;
    width: 5px;
    background: white;
    border: 2px solid white;
    border-radius: 50%;
  }

  &.fish-0 {
    background: blue;

    &:before {
      ${tail('blue')}
    }
  }

  &.fish-1 {
    background: red;

    &:before {
      ${tail('red')}
    }
  }

  &.fish-2 {
    background: green;

    &:before {
      ${tail('green')}
    }
  }

  &.caught {
    transform: rotate(-90deg);

    &:hover {
      opacity: 1;
    }
  }

  &.reeling {
    margin-top: -350px;
  }

  &.incorrect {
    transform: rotate(10deg);

    &:hover {
      opacity: 1;
    }
  }
`;

const World = styled.div`
  display: flex;
  flex-direction: column;
  justify: space-between;
`;

export default FishingPage;
