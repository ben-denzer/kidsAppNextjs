import AnalyticsWrapper from '../../client/containers/AnalyticsWrapper';
import LoginForm from '../../client/components/accountForms/LoginForm';
import RedirectIfLoggedIn from '../../client/components/auth/RedirectIfLoggedIn';
import Head from 'next/head';

export default function LoginPage(props) {
  return (
    <div>
      <Head>
        <title>Log In | My Sight Words.com</title>
        <meta name="description" content="Log in to your account at MySightWords.com" />
        <RedirectIfLoggedIn />
      </Head>
      <AnalyticsWrapper>
        <LoginForm {...props} />
      </AnalyticsWrapper>
    </div>
  );
}
