import PrintableGamesPage
  from '../client/components/PrintableGames/PrintableGamesPage';
import AnalyticsWrapper from '../client/containers/AnalyticsWrapper';
import MainLayout from '../client/components/MainLayout';
import Head from 'next/head';

export default function printableGames(props) {
  return (
    <div>
      <Head>
        <title>Printable Reading Games | My Sight Words.com</title>
      </Head>
      <AnalyticsWrapper>
        <PrintableGamesPage {...props} />
      </AnalyticsWrapper>
    </div>
  );
}
