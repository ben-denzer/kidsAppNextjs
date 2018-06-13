import styled from 'styled-components';

import { color1, color2 } from '../../config/globalStyles';

export const Card = styled.div`
  height: 10px;
  width: 10px;
  margin: 2px;
  background-size: cover;
  background-position: cover;
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
  height: 40px;
  width: 120px;
  margin: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  box-sizing: border-box;
  border: 2px solid black;

  &.active {
    background: ${color1};
    color: white;

    &:hover {
      cursor: default;
      opacity: 1;
    }
  }

  &:hover {
    cursor: pointer;
    opacity: .8;
  }

  &.width7 {
    @media (max-width: 1099px) {
      display: none;
    }
  }
`;

// export const Option = styled.div`
//   height: 150px;
//   width: 150px;
//   margin: 3px 5px;
//   border: 2px solid black;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   box-sizing: border-box;
//   justify-content: space-between;

//   &.active {
//     border: 7px solid black;
//     background: ${color1};
//     color: white;

//     &:hover {
//       cursor: default;
//       border: 7px solid black;
//     }
//   }

//   &:hover {
//     cursor: pointer;
//     border: 4px solid black;
//   }
// `;

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
    background: ${color1};
  }
`;

export const Title = styled.h1`
  margin-bottom: 10px;
`;
