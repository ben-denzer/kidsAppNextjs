import AnalyticsWrapper from '../../client/containers/AnalyticsWrapper';
import MainLayout from '../../client/components/MainLayout';
import ForgotPwForm from '../../client/components/accountForms/ForgotPwForm';
import Head from 'next/head';

export default function LoginPage(props) {
  return (
    <div>
      <Head>
        <title>Forgot Password | My Sight Words.com</title>
      </Head>
      <AnalyticsWrapper>
        <ForgotPwForm {...props} />
      </AnalyticsWrapper>
    </div>
  );
}
