import AnalyticsWrapper from '../../client/containers/AnalyticsWrapper';
import Logout from '../../client/components/Logout/Logout';

export default function LogoutPage(props) {
  return (
    <div>
      <AnalyticsWrapper>
        <Logout {...props} />
      </AnalyticsWrapper>
    </div>
  );
}
