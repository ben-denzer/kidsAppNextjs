import OnlineGamesPage from '../client/components/OnlineGames/OnlineGamesPage';
import MainLayout from '../client/components/MainLayout';
import Head from 'next/head';

export default function hp(props) {
  return (
    <div>
      <Head>
        <title>Online Reading Games | My Sight Words.com</title>
      </Head>
      {MainLayout(OnlineGamesPage, props)}
    </div>
  );
}
