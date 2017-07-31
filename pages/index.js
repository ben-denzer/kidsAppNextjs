import Homepage from '../client/components/Homepage/Homepage';
import MainLayout from '../client/components/MainLayout';
import Head from 'next/head';

export default function hp(props) {
  return (
    <div>
      <Head>
        <title>My Sight Words.com</title>
      </Head>
      {MainLayout(Homepage, props)}
    </div>
  );
}
