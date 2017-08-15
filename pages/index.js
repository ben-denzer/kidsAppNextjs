import Homepage from '../client/components/Homepage/Homepage';
import AnalyticsWrapper from '../client/containers/AnalyticsWrapper';
import MainLayout from '../client/components/MainLayout';
import Head from 'next/head';

export default function hp(props) {
  return (
    <div>
      <Head>
        <title>My Sight Words.com</title>
      </Head>
      <AnalyticsWrapper>
        {MainLayout(Homepage, props)}
      </AnalyticsWrapper>
    </div>
  );
}
