import AnalyticsWrapper from '../../client/containers/AnalyticsWrapper';
import RedirectIfLoggedIn
  from '../../client/components/auth/RedirectIfLoggedIn';
import SignupForm from '../../client/components/accountForms/SignupForm';
import Head from 'next/head';

export default function SignupPage(props) {
  return (
    <div>
      <Head>
        <title>Sign Up | My Sight Words.com</title>
        <meta
          name="description"
          content="Create an account at MySightWords.com"
        />
        <RedirectIfLoggedIn />
      </Head>
      <AnalyticsWrapper>
        <SignupForm {...props} />
      </AnalyticsWrapper>
    </div>
  );
}
