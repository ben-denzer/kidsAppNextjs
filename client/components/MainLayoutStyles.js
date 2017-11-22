import styled from 'styled-components';
import { headerHeight } from './Header/HeaderStyles';
import { color2, color4 } from '../config/globalStyles';

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0;
  background-color: ${color4};
  background-size: cover;
  background-position: center;

  &.memory {
    background-image: url('/static/img/neighborhoodBg.jpg');
  }

  &.speech {
    background-image: url('/static/img/castleBg.png');
  }

  &.online-games {
    background-image: url('/static/img/playgroundBg.jpg');
  }

  &.bingo {
    background-image: url('/static/img/farmBg.jpg');
  }

  @media (max-width: 700px) {
    background-image: none;
  }

  .whiteBox {
    width: 80%;
    max-width: 1600px;
    margin: 20px auto;
    min-height: calc(70vh - ${headerHeight}px);
    padding: 25px;
    background: rgba(255, 255, 255, .9);
    border: 3px solid #999;
    border-radius: 20px;

    &.fishing {
      background-image: url('/static/img/fishingBg.svg');
      background-size: cover;
    }

    @media (max-width: 1000px) {
      width: 90%;
      border: 1px;
      border-radius: 5px;
      padding: 15px 5px;
      min-height: 200px;
    }

    @media (max-width: 700px) {
      background: white;
      width: 97%;
    }
  }
`;
