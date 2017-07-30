import HomepageContainer from '../client/containers/HomepageContainer';
import MainLayout from '../client/components/MainLayout';
import Head from 'next/head';

export default function hp(props) {
  return (
    <div>
      <Head>
        <title>My Sight Words.com</title>
      </Head>
      {MainLayout(HomepageContainer, props)}
    </div>
  );
}
