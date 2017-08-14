import OnlineBingoContainer from '../../client/containers/OnlineBingoContainer';
import MainLayout from '../../client/components/MainLayout';
import Head from 'next/head';

export default function speech(props) {
  return (
    <div>
      <Head>
        <title>Sight Word Bingo Online</title>
      </Head>
      {MainLayout(OnlineBingoContainer, props)}
    </div>
  );
}
