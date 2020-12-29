import MemoryContainer from '../../client/containers/MemoryContainer';
import AnalyticsWrapper from '../../client/containers/AnalyticsWrapper';
import Head from 'next/head';

export default function speech(props) {
  return (
    <div>
      <Head>
        <title>Memory Matching Game | My Sight Words.com</title>
        <meta
          name="description"
          content="Have fun learning sight words by playing games online. Match two cards with the same word to remove them from the game. Match all of the words and you win."
        />
      </Head>
      <AnalyticsWrapper>
        <MemoryContainer {...props} />
      </AnalyticsWrapper>
    </div>
  );
}
