import SpeechPage from '../client/containers/SpeechPageContainer';
import Head from 'next/head';
import { BodyMargin, Viewport } from '../client/config/GlobalHeadTags';

export default () => (
  <div>
    <Head>
      <BodyMargin />
      <Viewport />
    </Head>
    <SpeechPage />
  </div>
);
