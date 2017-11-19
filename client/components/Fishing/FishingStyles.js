import styled from 'styled-components';

const fishWidth = 150;

export const AboveWater = styled.div`
  display: flex;
  justify-content: center;

  h1 {
    margin-top: 20%;
    background-color: rgba(255, 255, 255, .8);
    padding: 15px 40px;
    border: 4px solid #999;
    font-size: 48px;

    @media (max-width: 600px) {
      font-size: 36px;
      padding: 10px 30px;
    }
  }
`;

export const BelowWater = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 10px;

  @media (max-width: 600px) {
    display: block;
    width: ${fishWidth}px;
  }
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

export const Fish = styled.div`
  height: ${fishWidth / 2}px;
  min-width: ${fishWidth}px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  position: relative;
  transition: transform .5s ease-in-out, margin 2s ease-in-out, bottom 2s ease-in-out;

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

  @media (max-width: 600px) {
      position: absolute;
      left: calc(50% - ${fishWidth / 2}px);
  }

  &.fish-0 {
    background: blue;

    &:before {
      ${tail('blue')}
    }

    @media (max-width: 600px) {
      bottom: ${ fishWidth + 30 }px;
    }
  }

  &.fish-1 {
    background: red;

    &:before {
      ${tail('red')}
    }

    @media (max-width: 600px) {
      bottom: ${ fishWidth / 2 + 20 }px;
    }
  }

  &.fish-2 {
    background: green;

    &:before {
      ${tail('green')}
    }

    @media (max-width: 600px) {
      bottom: 10px;
    }
  }

  &.caught {
    transform: rotate(-90deg);

    &:hover {
      opacity: 1;
    }
  }

  &.reeling {
    margin-top: -150px;

    @media (max-width: 600px) {
      bottom: ${fishWidth * 2}px;
    }
  }

  &.incorrect {
    transform: rotate(10deg);

    &:hover {
      opacity: 1;
    }
  }
`;

export const FishingBox = styled.div`
  min-height: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 1800px) {
    min-height: 600px;
  }

  @media (max-width: 900px) {
    min-height: 450px; 
  }
`;
