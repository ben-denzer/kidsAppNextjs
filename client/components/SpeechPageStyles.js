import styled from 'styled-components';
import { color1 } from '../config/globalStyles';

export const CoinImage = styled.img`
  height: 40px;
  width: 40px;
  margin: 0 5px;
`;

export const HelpButton = styled.img`
  height: 40px;
  width: 40px;
  position: absolute;
  bottom: 10px;
  left: 10px;

  &:hover {
    cursor: pointer;
    opacity: .8;
  }
`;

export const MuteButton = styled.img`
  height: 40px;
  width: 40px;
  position: absolute;
  top: 10px;
  left: 10px;

  &:hover {
    cursor: pointer;
    opacity: .8;
  }
`;

export const PageContainer = styled.div`
  position: relative;
  min-height: calc(70vh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ScoreContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  top: 10px;
  right: 10px;
  font-size: 45px;
  font-weight: bold;
  color: ${color1};
`;

export const SkipWordButton = styled.img`
  width: 50px;
  height: auto;
  position: absolute;
  bottom: 10px;
  right: 10px;

  &:hover {
    cursor: pointer;
    opacity: .8;
  }
`;

export const Spinner = styled.img`
  height: 150px;
  width: 150px;
`;

export const WordContainer = styled.div`
  font-size: 60px;
  font-weight: bold;
`;
