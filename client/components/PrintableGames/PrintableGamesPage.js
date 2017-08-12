import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import GameThumbnail from '../GameThumbnail';
import { textColor } from '../../config/globalStyles';

export default function PrintableGamesContainer(props) {
  return (
    <PageContainer>
      <h1>Printable Games</h1>
      <h2>
        Activities To Help Your Child Learn To Read. Print These Games And Play At Home
      </h2>
      <ThumbContainer>
        <ThumbBox>
          <Link prefetch href="/printable-games/flashcards">
            <a>
              <GameThumbnail
                title="Flash Cards"
                img="/static/img/flashcardsThumb.jpg"
              />
              <Headline>
                Print Flashcards To Use Offline
                {' '}
              </Headline>
            </a>
          </Link>
        </ThumbBox>
      </ThumbContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  min-height: 600px;
  padding: 50px;

  @media (max-width: 900px) {
    padding: 15px;
  }

  a {
    font-size: 16px;
    color: ${textColor};
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1, h2 {
    text-align: center;
  }

  h1 {
    margin-bottom: 0;
  }

  h2 {
    margin-top: 5px;
    margin-bottom: 10px;
  }
`;

const ThumbBox = styled.div`
  width: 100%;
  margin: 15px;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ThumbContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

const Headline = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
