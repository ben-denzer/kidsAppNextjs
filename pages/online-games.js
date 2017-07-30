import OnlineGamesContainer from '../client/containers/OnlineGamesContainer';
import MainLayout from '../client/components/MainLayout';
import Head from 'next/head';

export default function hp(props) {
  return (
    <div>
      <Head>
        <title>Online Reading Games | My Sight Words.com</title>
      </Head>
      {MainLayout(OnlineGamesContainer, props)}
    </div>
  );
}
