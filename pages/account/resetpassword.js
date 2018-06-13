import AnalyticsWrapper from '../../client/containers/AnalyticsWrapper';
import RedirectIfLoggedIn
  from '../../client/components/auth/RedirectIfLoggedIn';
import ResetPwForm from '../../client/components/accountForms/ResetPwForm';
import Head from 'next/head';

export default function ResetPwPage(props) {
  return (
    <div>
      <Head>
        <title>Reset Password | My Sight Words.com</title>
        <meta
          name="description"
          content="Create an account at MySightWords.com"
        />
        <RedirectIfLoggedIn />
      </Head>
      <AnalyticsWrapper>
        <ResetPwForm {...props} />
      </AnalyticsWrapper>
    </div>
  );
}
