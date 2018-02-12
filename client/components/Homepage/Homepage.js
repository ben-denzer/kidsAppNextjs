import React from 'react';
import Link from 'next/link';
import MainLayout from '../MainLayout';
import ThumbContainer from './ThumbContainer';
import {
  ArticleImg,
  CtaButton,
  HpContainer,
  PageHeadline,
  PageTitle,
  TextInner,
  TextSection,
  ThumbsInner,
  ThumbsSection,
  TopSection,
  TopSectionOverlay
} from './HomepageStyles';

function HomepageContainer(props) {
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
        <TextInner className="hpFirstParagraph">
          <h1>Online Reading Games For Kids</h1>
          <h3>
            Give your young reader a head start with My Sight Words.com - Using games to practice your sight words and spelling words is the best way to keep a child interested in learning. They'll earn gold coins as they complete the games, and gain confidence with their reading skills along the way.
          </h3>
          <h3>
            Click a link below to get started.
          </h3>
        </TextInner>
      </TextSection>
      <TextSection>
        <TextInner>
          <h1>Use Your Own Word List To Customize The Games</h1>
          <p className="center">
            This website is completely free to use, but if you want to use a custom word list to focus on your child's current spelling words,
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
          {/*
          <ThumbContainer
            altText="Mom Reading To Her Kids"
            headline="For Parents"
            picture="momAndKids.jpg"
            url="/articles"
          />
          */}
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
            Dr. Edward William Dolch studied the most commonly occurring words in the children's books of the 1930s-40s. He created a list of 315 words (220 "service words" and 95 "high frequency nouns"). The Dolch words are usually split into groups for each grade level from pre-kindergarten to third grade.
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

export default MainLayout(HomepageContainer);
