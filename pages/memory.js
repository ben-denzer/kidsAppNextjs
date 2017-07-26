import SpeechPage from '../client/containers/SpeechPageContainer';
import Head from 'next/head';

export default function speech(props) {
  return (
    <div>
      <Head>
        <title>Memory Matching Game</title>
      </Head>
      <MemoryPage url={props.url} />
    </div>
  );
}
