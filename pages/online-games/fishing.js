import FishingContainer from '../../client/containers/FishingContainer';
import AnalyticsWrapper from '../../client/containers/AnalyticsWrapper';
import Head from 'next/head';

export default function speech(props) {
  return (
    <div>
      <Head>
        <title>Sight Word Fishing</title>
      </Head>
      <AnalyticsWrapper>
        <FishingContainer {...props} />
      </AnalyticsWrapper>
    </div>
  );
}
