import OnlineBingoContainer from '../../client/containers/OnlineBingoContainer';
import AnalyticsWrapper from '../../client/containers/AnalyticsWrapper';
import Head from 'next/head';

export default function speech(props) {
  return (
    <div>
      <Head>
        <title>Sight Word Bingo | My Sight Words.com</title>
        <meta
          type="description"
          content="Learn sight words the fun way. Early readers love this online bingo game. Mark all of the words in a row, column, or diagonal line to win the game and earn a coin."
        />
      </Head>
      <AnalyticsWrapper>
        <OnlineBingoContainer {...props} />
      </AnalyticsWrapper>
    </div>
  );
}
