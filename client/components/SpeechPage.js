import React from 'react';
import styled from 'styled-components';

function SpeechPage(props) {
  const { coins, currentWordIndex, listen, score, showPrize, wordList } = props;

  const WordDisplay = showPrize
    ? <Spinner src="/static/img/spinningQuarter.gif-c200" />
    : wordList[currentWordIndex];

  return (
    <PageContainer>
      <ScoreContainer>
        <CoinImage src="/static/img/quarter.png" /> {coins}
      </ScoreContainer>
      <WordContainer>
        {WordDisplay}
      </WordContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div``;

const ScoreContainer = styled.div``;

const Spinner = styled.img`
  height: 150px;
  width: 150px;
`;

const CoinImage = styled.img`
  height: 50px;
  width: 50px;
`;

const WordContainer = styled.div``;

export default SpeechPage;
