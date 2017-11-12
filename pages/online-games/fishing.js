import FishingContainer from '../../client/containers/FishingContainer';
import AnalyticsWrapper from '../../client/containers/AnalyticsWrapper';
import MainLayout from '../../client/components/MainLayout';
import Head from 'next/head';

export default function speech(props) {
  return (
    <div>
      <Head>
        <title>Sight Word Fishing</title>
      </Head>
      <AnalyticsWrapper>
        {MainLayout(FishingContainer, props)}
      </AnalyticsWrapper>
    </div>
  );
}
