import styled from 'styled-components';

export const color2 = '#327d32';

export const Card = styled.div`
  height: 10px;
  width: 10px;
  margin: 2px;
  background-size: cover;
  backgroung-position: cover;
`;

export const CardBack = styled.div`
  height: 100px;
  width: 100px;
  background-position: center;
  background-size: cover;
  margin: 5px;
  border-radius: 5px;
  box-sizing: border-box;
  border: 2px solid black;

  @media (max-width: 700px) {
    height: 75px;
    width: 75px;
  }

  &.active {
    border: 7px solid black;

    &:hover {
      cursor: default;
      opacity: 1;
    }
  }

  &:hover {
    cursor: pointer;
    opacity: .8;
  }
`;

export const CardRow = styled.div`
  display: flex;
  justify-content: center;
`;

export const ChangeSettings = styled.p`
  font-size: 28px;
  color: ${color2};

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const Option = styled.div`
  height: 150px;
  width: 100px;
  margin: 3px 5px;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;

  &.active {
    border: 7px solid black;
    background: #fff;

    &:hover {
      cursor: default;
      border: 7px solid black;
    }
  }

  &.width5 {
    @media (max-width: 500px) {
      display: none;
    }
  }

  &.width4 {
    @media (max-width: 400px) {
      display: none;
    }
  }

  &:hover {
    cursor: pointer;
    border: 4px solid black;
  }
`;

export const OptionHeadline = styled.h4`
  font-size: 16px;
  font-weight: bold;
  margin: 5px;
`;

export const OptionsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

export const OptionTitle = styled.h3`
  margin: 5px;
  font-size: 18px;
  font-weight: bold;
`;

export const Restart = styled.img`
  height: 80px;
  width: auto;
  margin-bottom: 20px;
`;

export const RestartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    cursor: pointer;

    img {
      opacity: .8;
    }
  }
`;

export const StartGame = styled.button`
  height: 50px;
  width: 250px;
  font-size: 32px;
  color: white;
  background: ${color2};
  border: 3px solid black;
  margin-top: 15px;

  &:hover {
    cursor: pointer;
    background: blue;
  }
`;

export const Title = styled.h1`
  margin-bottom: 10px;
`;
