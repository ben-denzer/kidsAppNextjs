import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import MainLayout from '../MainLayout';
import GameThumbnail from '../GameThumbnail';
import { textColor } from '../../config/globalStyles';

function OnlineGamesContainer(props) {
  return (
    <PageContainer className="whiteBox">
      <h1>Online Games</h1>
      <h2>Make learning fun with these free online sight word games.</h2>
      <ThumbContainer>
        <ThumbBox>
          <Link prefetch href="/online-games/memory">
            <a>
              <GameThumbnail
                title="Memory Match"
                img="/static/img/memoryThumb.jpg"
              />
              <Headline>
                Remember the position of each card was while trying to match two cards with the same word.
                {' '}
              </Headline>
            </a>
          </Link>
        </ThumbBox>
        <ThumbBox>
          <Link prefetch href="/online-games/bingo">
            <a>
              <GameThumbnail
                title="Online Bingo"
                img="/static/img/onlineBingoThumb.jpg"
              />
              <Headline>
                Pay attention to each word that is called and mark the word in your bingo card.
                {' '}
              </Headline>
            </a>
          </Link>
        </ThumbBox>
        <ThumbBox>
          <Link prefetch href="/online-games/speech">
            <a>
              <GameThumbnail
                title="Read Out Loud"
                img="/static/img/speechThumb.jpg"
              />
              <Headline>
                Read the flash cards out loud to earn gold coins
                <strong>
                  *This game is using features that are not available in all browsers, and it also requires a microphone.
                </strong>
              </Headline>
            </a>
          </Link>
        </ThumbBox>
        <ThumbBox>
          <Link prefetch href="/online-games/fishing">
            <a>
              <GameThumbnail
                title="Fishing"
                img="/static/img/fishingThumb.jpg"
              />
              <Headline>
                Catch the fish by matching words.
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
  max-width: 100%;
  box-sizing: border-box;

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
  box-sizing: border-box;
  max-width: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
`;

export default MainLayout(OnlineGamesContainer)
