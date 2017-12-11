import Homepage from '../client/components/Homepage/Homepage';
import AnalyticsWrapper from '../client/containers/AnalyticsWrapper';
import MainLayout from '../client/components/MainLayout';
import Head from 'next/head';

export default function hp(props) {
  return (
    <div>
      <Head>
        <title>My Sight Words.com</title>
        <meta name="description" content="Make Learning Fun With Online Sight Words Games - Help your child learn their sight words and spelling words by playing, and watch their confidence and reading ability grow before your eyes" />
      </Head>
      <AnalyticsWrapper>
        <Homepage {...props} />
      </AnalyticsWrapper>
    </div>
  );
}
