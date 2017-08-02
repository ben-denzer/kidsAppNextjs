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
          <Link href="/online-games"><CtaButton>Play For Free</CtaButton></Link>
        </TopSectionOverlay>
      </TopSection>
      <TextSection>
        <TextInner>
          <h1>Use Your Own Word List To Customize The Games</h1>
          <p className="center">
            This website is completely free to use, but if you want to use a custom word list and/or save your child's progress,
            {' '}
            <Link href="/login"><a>Log In</a></Link>
            {' '}
            or
            {' '}
            <Link href="/signup"><a>Sign Up</a></Link>
            {' '}
            for an account.
          </p>
        </TextInner>
      </TextSection>
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
      <TextSection>
        <TextInner>
          <h1>Teach Your Child To Read With My Sight Words.com</h1>
          <ArticleImg
            src="/static/img/classroom.jpg"
            alt="Classroom with children and teachers"
          />
          <h3>Sight Words</h3>
          <p>
            Up to 80% of the words in your children's books are considered 'sight words'. If a beginning reader is able to memorize the sight words, they will be more able to concentrate on the meaning of the text instead of having to struggle with every word in the book. A lot of the words in this list have unusual spelling patterns so it is not easy to sound out the letters, and most of the words are hard to describe with a picture. Memorizing these patterns will give students a great start when learning to read.
          </p>
          <h3>Dolch Word List</h3>
          <p>
            Dr. Edward William Dolch studied the most commonly occurring words in the children's books of the 1930s-40s. He created a list of 315 words (220 'service words' and 95 'high frequency nouns'). The Dolch words are usually split into groups for each grade level from pre-kindergarten to third grade.
          </p>
          <h3>Kids Learn By Playing</h3>
          <p>
            Playing games is important for a child's development. The only way to master a skill is with repeated practice, and turning this repetition into a game is one of the best ways for children (and adults!) to stay interested.
          </p>
          <h3>Personalize Your Experience</h3>
          <p>
            Each teacher will probably have a different list of words that they will test your child on. By creating an account it is easy to customize the games on this site. See our
            {' '}
            <Link href="/signup"><a>sign up page</a></Link>
            {' '}
            for more details.
          </p>
        </TextInner>
      </TextSection>
    </HpContainer>
  );
}

const ArticleImg = styled.img`
  height: 250px;
  width: auto;
  float: right;
  margin-left: 15px;

  @media (max-width: 1100px) {
    display: none;
  }
`;

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

const TextInner = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 30px;

  @media (max-width: 900px) {
    padding: 10px;
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
`;

const TextSection = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: center;

  h1 {
    text-align: center;
  }
`;

const ThumbsSection = styled.div`
  width: 100%;
  margin: 0;
  height: 300px;
  background-color: ${color2};

  @media (max-width: 900px) {
    height: 800px;
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
    height: 800px;
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
