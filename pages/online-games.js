import OnlineGamesPage from '../client/components/OnlineGames/OnlineGamesPage';
import AnalyticsWrapper from '../client/containers/AnalyticsWrapper';
import MainLayout from '../client/components/MainLayout';
import Head from 'next/head';

export default function onlineGames(props) {
  return (
    <div>
      <Head>
        <title>Online Reading Games | My Sight Words.com</title>
        <meta name="description" content="Learn Sight Words And Spelling Words Online For Free - Speech recognition flashcards, bingo, memory, and more" />
      </Head>
      <AnalyticsWrapper>
        {MainLayout(OnlineGamesPage, props)}
      </AnalyticsWrapper>
    </div>
  );
}
