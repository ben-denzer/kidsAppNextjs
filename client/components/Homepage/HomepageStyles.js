import styled from 'styled-components';
import {
  color1,
  color2,
  color3,
  color4,
  light,
  transparentLight
} from '../../config/globalStyles';

export const ArticleImg = styled.img`
  height: 250px;
  width: auto;
  float: right;
  margin-left: 15px;

  @media (max-width: 1100px) {
    display: none;
  }
`;
export const CtaButton = styled.a`
  margin-top: 20px;
  height: 50px;
  width: 200px;
  background-color: ${color1};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${light};
  font-size: 36px;
  font-weight: bold;
  border: 3px solid ${color4};
  border-radius: 5px;
  font-family: 'Open Sans Condensed', Raleway, Arial, Helvetica, sans-serif;

  @media (max-width: 600px) {
    font-size: 24px;
    height: 35px;
    width: 150px;
  }

  &:hover {
    cursor: pointer;
    background-color: ${color2};
  }
`;
export const HpContainer = styled.div`
  margin-top: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${color2};
`;

export const PageHeadline = styled.h2`
  font-size: 40px;
  color: ${light};
  font-family: 'Open Sans Condensed', Raleway, Arial, Helvetica, sans-serif;
  margin: 0;

  @media (max-width: 900px) {
    font-size: 25px;
  }
`;

export const PageTitle = styled.h1`
  font-size: 55px;
  margin: 10% auto 10px;
  color: ${light};
  font-family: 'Open Sans Condensed', Raleway, Arial, Helvetica, sans-serif;

  @media (max-width: 900px) {
    font-size: 40px;
  }

  @media (max-width: 600px) {
    font-size: 30px;
  }
`;

export const TextInner = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 30px;

  @media (max-width: 900px) {
    padding: 10px;
  }

  h1 {
    margin-top: 0;
  }

  h3 {
    margin-bottom: 0px;
  }

  p {
    margin-top: 5px;

    &.center {
      width: 100%;
      text-align: center;
    }
  }

  &.hpFirstParagraph {
    h3 {
      text-align: center;
      font-weight: normal;
    }
  }
`;

export const TextSection = styled.div`
  width: 100%;
  background-color: ${color4};
  display: flex;
  justify-content: center;

  h1 {
    text-align: center;
  }
`;

export const ThumbsInner = styled.div`
  width: 100%;
  max-width: 1400px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 900px) {
    flex-direction: column;
    height: 800px;
  }
`;

export const ThumbsSection = styled.div`
  width: 100%;
  margin: 0;
  height: 300px;
  background-color: ${color2};

  @media (max-width: 900px) {
    height: 800px;
  }
`;

export const TopSection = styled.div`
  width: 100%;
  background-image: url("/static/img/kidsWithPictures.jpg");
  background-size: cover;
  background-position: center;
  position: relative;
  height: 800px;

  @media (max-width: 1500px) {
    height: 600px;
  }

  @media (max-width: 600px) {
    height: 400px;
  }
`;

export const TopSectionOverlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${transparentLight};
  display: flex;
  flex-direction: column;
  align-items: center;
`;
