import AnalyticsWrapper from '../../client/containers/AnalyticsWrapper';
import MainLayout from '../../client/components/MainLayout';
import AccountContainer from '../../client/containers/AccountContainer';
import Head from 'next/head';

export default function AccountHomePage(props) {
  return (
    <div>
      <Head>
        <title>My Account | My Sight Words.com</title>
      </Head>
      <AnalyticsWrapper>
        <AccountContainer {...props} />
      </AnalyticsWrapper>
    </div>
  );
}
