import AnalyticsWrapper from '../../client/containers/AnalyticsWrapper';
import MainLayout from '../../client/components/MainLayout';
import ChildMenu from '../../client/components/ChildMenu/ChildMenu';
import Head from 'next/head';

export default function LoginPage(props) {
  return (
    <div>
      <Head>
        <title>Menu | My Sight Words.com</title>
      </Head>
      <AnalyticsWrapper>
        <ChildMenu {...props} />
      </AnalyticsWrapper>
    </div>
  );
}
