import AnalyticsWrapper from '../../client/containers/AnalyticsWrapper';
import MainLayout from '../../client/components/MainLayout';
import ResetPwForm from '../../client/components/accountForms/ResetPwForm';
import Head from 'next/head';

export default function ResetPwPage(props) {
  console.log(props);
  return (
    <div>
      <Head>
        <title>Reset Password | My Sight Words.com</title>
        <meta name="description" content="Create an account at MySightWords.com" />
      </Head>
      <AnalyticsWrapper>
        <ResetPwForm {...props} />
      </AnalyticsWrapper>
    </div>
  );
}
