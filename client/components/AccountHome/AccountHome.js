import React from 'react';
import ChangePwForm from '../accountForms/ChangePwForm';

function AccountHome(props) {
  return (
    <div className="whiteBox">
      <ChangePwForm {...props} />
    </div>
  );
}

export default AccountHome;
