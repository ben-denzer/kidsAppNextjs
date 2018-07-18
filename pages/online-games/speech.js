import SpeechPageContainer from '../../client/containers/SpeechPageContainer';
import AnalyticsWrapper from '../../client/containers/AnalyticsWrapper';
import Head from 'next/head';

export default function speech(props) {
  return (
    <div>
      <Head>
        <title>Read Sight Words</title>
        <meta
          type="description"
          content="Online sight words game using speech recognition. Have fun and build confidence by reading words out loud - earn coins as you learn."
        />
      </Head>
      <AnalyticsWrapper>
        <SpeechPageContainer {...props} />
      </AnalyticsWrapper>
    </div>
  );
}
