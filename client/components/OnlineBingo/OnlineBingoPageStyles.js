import styled from 'styled-components';
import { color2, light } from '../../config/globalStyles';

const boxBorder = '1px solid black';

export const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  height: 75px;
  width: 75px;
  border-right: ${boxBorder};
  border-bottom: ${boxBorder};
  text-align: center;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */

  &:nth-child(1) {
    border-left: ${boxBorder};
  }

  &.checked {
    background: ${color2};
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

  @media (max-width: 400px) {
    height: 60px;
    width: 60px;
    font-size: 18px;
  }
`;

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 767px) {
    margin-bottom: 100px;
  }
`;

export const BoxRow = styled.div`
  display: flex;

  &:nth-child(1) {
    border-top: ${boxBorder};
  }
`;

export const GameContainer = styled.div`
  display: flex;

  @media (max-width: 767px) {
    flex-direction: column-reverse;
  }
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 50px;
  min-width: 150px;
  min-height: 40px;
  z-index: 2;

  @media (max-width: 767px) {
    padding-left: 0;
    align-items: center;
  }

  @media (min-width: 767px) and (max-width: 1100px) {
    padding-top: 65px;
  }
`;

export const OldWord = styled.div`
  font-size: 36px;

  @media (max-width: 767px) {
    display: none;
  }

  &:first-child {
    display: block;
    margin-bottom: 50px;
    font-size: 68px;
    font-weight: bold;

    @media (max-width: 767px) {
      margin-bottom: 20px;
      text-align: center;
    }
    @media (max-width: 700px) {
      background-color: white;
    }
  }
`;
