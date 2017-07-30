import MemoryContainer from '../../client/containers/MemoryContainer';
import MainLayout from '../../client/components/MainLayout';
import Head from 'next/head';

export default function speech(props) {
  return (
    <div>
      <Head>
        <title>Memory Matching Game</title>
      </Head>
      {MainLayout(MemoryContainer, props)}
    </div>
  );
}
