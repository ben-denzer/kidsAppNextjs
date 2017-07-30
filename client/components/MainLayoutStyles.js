import styled from 'styled-components';
import { headerHeight } from './Header/HeaderStyles';

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 90vh;
  padding-top: 0;
  background-image: url('/static/img/castleBg.png');
  background-size: cover;
  background-position: center;

  &.memory {
    background-image: url('/static/img/neighborhoodBg.jpg');
  }

  @media (max-width: 700px) {
    background-image: none;
    background-color: lightskyblue;
  }

  >div {
    width: 80%;
    max-width: 1600px;
    margin-top: 15px;
    min-height: calc(70vh - ${headerHeight}px);
    padding: 25px;
    background: rgba(255, 255, 255, .9);
    border: 3px solid #999;
    border-radius: 20px;

    @media (max-width: 1000px) {
      width: 90%;
      border: 1px;
      border-radius: 5px;
      padding: 15px 5px;
      min-height: 200px;
    }

    @media (max-width: 700px) {
      background: white;
    }
  }
`;
