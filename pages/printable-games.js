import PrintableGamesPage
  from '../client/components/PrintableGames/PrintableGamesPage';
import MainLayout from '../client/components/MainLayout';
import Head from 'next/head';

export default function printableGames(props) {
  return (
    <div>
      <Head>
        <title>Printable Reading Games | My Sight Words.com</title>
      </Head>
      {MainLayout(PrintableGamesPage, props)}
    </div>
  );
}
