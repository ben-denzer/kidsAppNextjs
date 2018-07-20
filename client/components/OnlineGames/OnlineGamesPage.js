import React from 'react';
import Link from 'next/link';

import GameThumbnail from '../GameThumbnail';
import MainLayout from '../MainLayout';
import OnlineGamesPageText from './OnlineGamesPageText';

import {
  Headline,
  PageContainer,
  ThumbBox,
  ThumbContainer
} from './OnlineGamesPageStyles';

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
                Remember the position of each card while trying to match two cards with the same word.
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
                  *Google Chrome is required to play this game, and it also requires a microphone.
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

export default MainLayout(OnlineGamesContainer, OnlineGamesPageText);
