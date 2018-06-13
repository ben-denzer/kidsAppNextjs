import OnlineBingoContainer from '../../client/containers/OnlineBingoContainer';
import AnalyticsWrapper from '../../client/containers/AnalyticsWrapper';
import Head from 'next/head';

export default function speech(props) {
  return (
    <div>
      <Head>
        <title>Sight Word Bingo | My Sight Words.com</title>
      </Head>
      <AnalyticsWrapper>
        <OnlineBingoContainer {...props} />
      </AnalyticsWrapper>
    </div>
  );
}
