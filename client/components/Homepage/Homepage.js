import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { color1, color2 } from '../../config/globalStyles';
import ThumbContainer from './ThumbContainer';

export default function HomepageContainer(props) {
  return (
    <HpContainer>
      <TopSection>
        <TopSectionOverlay>
          <PageTitle>My Sight Words.com</PageTitle>
          <PageHeadline>Learn To Read By Playing Games</PageHeadline>
          <Link><CtaButton>Play For Free</CtaButton></Link>
        </TopSectionOverlay>
        <ThumbsSection>
          <ThumbsInner>
            <ThumbContainer
              altText="Kids Playing Computer Games"
              headline="Play Online"
              picture="kidsAtComputer.jpg"
              url="/online-games"
            />
            <ThumbContainer
              altText="Children Playing Bingo"
              headline="Printable Games"
              picture="bingo.jpg"
              url="/printable-games"
            />
            <ThumbContainer
              altText="Mom Reading To Her Kids"
              headline="For Parents"
              picture="momAndKids.jpg"
              url="/articles"
            />
          </ThumbsInner>
        </ThumbsSection>
      </TopSection>
    </HpContainer>
  );
}

const HpContainer = styled.div`
  margin-top: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${color2};  
`;

const PageHeadline = styled.h2`
  font-size: 40px;
  color: white;
  font-family: 'Open Sans Condensed', Raleway, Arial, Helvetica, sans-serif;
  margin: 0;

  @media (max-width: 900px) {
    font-size: 25px;
  }
`;

const PageTitle = styled.h1`
  font-size: 55px;
  margin: 10% auto 10px;
  color: white;
  font-family: 'Open Sans Condensed', Raleway, Arial, Helvetica, sans-serif;

  @media (max-width: 900px) {
    font-size: 40px;
  }

  @media (max-width: 600px) {
    font-size: 30px;
  }
`;

const ThumbsSection = styled.div`
  width: 100%;
  margin: 0;
  height: 300px;
  background-color: ${color2};
  
  @media (max-width: 900px) {
    height: 1000px;
  }
`;

const ThumbsInner = styled.div`
  width: 100%;
  max-width: 1400px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 900px) {
    flex-direction: column;
    height: 1000px;
  }
`;

const TopSection = styled.div`
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

const TopSectionOverlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CtaButton = styled.a`
  margin-top: 20px;
  height: 50px;
  width: 200px;
  background-color: ${color1};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 36px;
  font-weight: bold;
  border: 3px solid white;
  border-radius: 5px;
  font-family: 'Open Sans Condensed', Raleway, Arial, Helvetica, sans-serif;

  @media (max-width: 600px) {
    font-size: 24px;
    height: 35px;
    width: 150px;
  }

  &:hover {
    cursor: pointer;
    background-color: ${color1}, 10%);
  }
`;
