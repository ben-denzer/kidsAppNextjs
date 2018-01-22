import React from 'react';
import { ErrorBox, FormButton } from '../accountForms/formStyles';
import ChangePwForm from '../accountForms/ChangePwForm';
import EditChild from './EditChild';
import Modal from '../Modal/Modal';
import styled from 'styled-components';

function AccountHome(props) {
  const { accountExpired, changePwFormOpen, error, parentData, toggleChangePwForm } = props;
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
      { props.error && <ErrorBox>{props.error}</ErrorBox> }
      <div className="twoCols">
        <div>
          <h2>Details</h2>
          <DetailRow>
            <DetailLabel>Email: </DetailLabel>
            <DetailText>{parentData.email}</DetailText>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Member Since: </DetailLabel>
            <DetailText>{new Date(parentData.signup_utc).toLocaleDateString()}</DetailText>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Membership Expiration: </DetailLabel>
            <DetailText>{new Date(parentData.expiration_utc).toLocaleDateString()}</DetailText>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Child Accounts: </DetailLabel>
            <DetailText>{parentData.children_allowed}</DetailText>
          </DetailRow>
          <FormButton
            onClick={toggleChangePwForm}
            hidden={changePwFormOpen}
          >
            Change Password
          </FormButton>
        </div>
        <div>
          {accountExpired ? <h2>Account Expired</h2> : <h2>Edit Children</h2>}
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

const DetailRow = styled.div``;
const DetailLabel = styled.span``;
const DetailText = styled.span``;

export default AccountHome;
