import MainLayout from '../../client/components/MainLayout';
import SpeechPageContainer from '../../client/containers/SpeechPageContainer';
import Head from 'next/head';

export default function speech(props) {
  return (
    <div>
      <Head>
        <title>Read Sight Words</title>
      </Head>
      {MainLayout(SpeechPageContainer, props)}
    </div>
  );
}
