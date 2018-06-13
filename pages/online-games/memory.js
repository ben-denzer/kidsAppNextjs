import MemoryContainer from '../../client/containers/MemoryContainer';
import AnalyticsWrapper from '../../client/containers/AnalyticsWrapper';
import Head from 'next/head';

export default function speech(props) {
  return (
    <div>
      <Head>
        <title>Memory Matching Game</title>
      </Head>
      <AnalyticsWrapper>
        <MemoryContainer {...props} />
      </AnalyticsWrapper>
    </div>
  );
}
