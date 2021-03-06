import styled from 'styled-components';

export const CardContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 75px 0;
`;

export const Card = styled.div`
  height: 200px;
  width: 200px;
  margin: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  border-radius: 5px;
  font-size: 26px;
  font-weight: bold;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */

  @media (max-width: 1800px) {
    height: 100px;
    width: 100px;
    margin: 8px;
  }

  @media (max-width: 900px) {
    height: 75px;
    width: 75px;
    margin: 4px;
    font-size: 22px;
  }

  &.faceDown {
    background-color: red;
    background-position: center;
    background-size: cover;

    &:hover {
      cursor: pointer;
      opacity: .8;
    }

    p {
      display: none;
    }
  }

  &.faceUp {
    background-color: white;

    p {
      &:hover {
        cursor: default;
      }
    }
  }

  &.hidden {
    opacity: .1;
    background-color: white;
  }
`;

export const CardRow = styled.div`
  display: flex;
  justify-content: center;
`;
