import MainLayout from '../../client/components/MainLayout';
import SpeechPageContainer from '../../client/containers/SpeechPageContainer';
import AnalyticsWrapper from '../../client/containers/AnalyticsWrapper';
import Head from 'next/head';

export default function speech(props) {
  return (
    <div>
      <Head>
        <title>Read Sight Words</title>
      </Head>
      <AnalyticsWrapper>
        <SpeechPageContainer {...props} />
      </AnalyticsWrapper>
    </div>
  );
}
