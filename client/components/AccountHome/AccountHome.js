import React from 'react';
import { FormButton } from '../accountForms/formStyles';
import ChangePwForm from '../accountForms/ChangePwForm';
import EditChild from './EditChild';
import Modal from '../Modal/Modal';

function AccountHome(props) {
  const { changePwFormOpen, toggleChangePwForm } = props;
  const children = props.children.map(a => {
    return (
      <EditChild
        key={a.child_id}
        child={a}
        {...props}
      />
    );
  });
  return (
    <div className="whiteBox">
      <h1>My Account</h1>
      <div className="twoCols">
        <div>
          <h2>Details</h2>
          <FormButton
            onClick={toggleChangePwForm}
            hidden={changePwFormOpen}
          >
            Change Password
          </FormButton>
        </div>
        <div>
          <h2>Edit Children</h2>
          {children}
        </div>
      </div>
      <Modal
        Body={() => <ChangePwForm {...props} />}
        modalOpen={changePwFormOpen}
        toggleModal={toggleChangePwForm}
      />
    </div>
  );
}

export default AccountHome;
