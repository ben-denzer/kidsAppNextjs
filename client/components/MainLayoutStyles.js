import styled from 'styled-components';
import { headerHeight } from './Header/HeaderStyles';
import { mainBg } from '../config/globalStyles';

export const ErrorBox = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 10;
  top: 0;
  left: 0;
  height: 200px;
  width: 100%;
  background-color: rgba(255, 0, 0, 0.9);
  color: white;
  font-size: 22px;
  padding: 10px;
  box-sizing: border-box;
`;

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0;
  background-color: ${mainBg};
  background-size: cover;
  background-position: center;

  @font-face {
    font-family: 'Print Clearly';
    src: url('/static/media/PrintClearly_TT.ttf') format('truetype');
  }

  &.memory {
    background-image: url('/static/img/neighborhoodBg.jpg');

    @media (max-width: 767px) {
      background-image: none;
    }
  }

  &.speech {
    background-image: url('/static/img/castleBg.png');

    @media (max-width: 767px) {
      background-image: none;
    }
  }

  &.online-games {
    background-image: url('/static/img/playgroundBg.jpg');

    @media (max-width: 767px) {
      background-image: none;
    }
  }

  &.bingo {
    background-image: url('/static/img/farmBg.jpg');

    @media (max-width: 767px) {
      background-image: none;
    }
  }

  @media (max-width: 700px) {
    background-image: none;
  }

  .preschoolFont {
    font-family: 'Print Clearly', Arial, Helvetica, sans-serif;
  }

  .whiteBox {
    width: 80%;
    max-width: 1600px;
    margin: 20px auto;
    min-height: calc(70vh - ${headerHeight}px);
    padding: 25px;
    background: rgba(255, 255, 255, 0.9);
    border: 3px solid #999;
    border-radius: 20px;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome and Opera */

    &.allowSelect {
      -webkit-touch-callout: text; /* iOS Safari */
      -webkit-user-select: text; /* Safari */
      -khtml-user-select: text; /* Konqueror HTML */
      -moz-user-select: text; /* Firefox */
      -ms-user-select: text; /* Internet Explorer/Edge */
      user-select: text; /* Non-prefixed version, currently
                                    supported by Chrome and Opera */
    }

    h1,
    h2 {
      text-align: center;
    }

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

    .twoCols {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;

      > div {
        width: 45%;

        @media (max-width: 767px) {
          width: 95%;
          margin: 2px auto;
        }
      }
    }
  }
`;

export const UnderGameTextContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  padding: 20px;
  font-size: 16px;

  h1 {
    text-align: center;
    font-size: 28px;
  }

  h2 {
    text-align: center;
    font-size: 18px;
  }

  .onlineGamesPageText {
    font-size: 16px;

    h3 {
      margin-bottom: -15px;
      padding-bottom: 0;
    }

    ul {
      margin-top: 0px;
      margin-left: -20px;
    }

    .centered {
      font-weight: bold;
      text-align: center;
    }
  }
`;
