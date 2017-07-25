import SpeechPage from '../client/containers/SpeechPageContainer';
import Head from 'next/head';

export default function speech(props) {
  return (
    <div>
      <Head>
        <title>Read Sight Words</title>
      </Head>
      <SpeechPage url={props.url} />
    </div>
  );
}
