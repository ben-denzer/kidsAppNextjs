import React from 'react';
import { FormErrorBox, FormButton } from '../accountForms/formStyles';
import ChangePwForm from '../accountForms/ChangePwForm';
import EditChild from './EditChild';
import Modal from '../Modal/Modal';
import {
  ButtonContainer,
  DetailLabel,
  DetailRow,
  DetailText,
  DetailTitle,
  SmallText
} from './AccountHomeStyles';

function AccountHome(props) {
  const {
    accountExpired,
    changePwFormOpen,
    loading,
    parentData,
    toggleChangePwForm
  } = props;

  const children = props.children.map(a => {
    return <EditChild key={a.child_id} child={a} {...props} />;
  });

  return (
    <div className="whiteBox allowSelect">
      <h1>My Account</h1>
      {props.error && <FormErrorBox>{props.error}</FormErrorBox>}
      <div className="twoCols">
        <div>
          <DetailTitle>Details</DetailTitle>
          <DetailRow>
            <DetailLabel>Email: </DetailLabel>
            <DetailText>{parentData.email}</DetailText>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Member Since: </DetailLabel>
            <DetailText>
              {new Date(parentData.signup_utc).toLocaleDateString()}
            </DetailText>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Child Accounts: </DetailLabel>
            <DetailText>{parentData.children_allowed}</DetailText>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Membership Expiration: </DetailLabel>
            <DetailText>
              {new Date(parentData.expiration_utc).toLocaleDateString()}
            </DetailText>
            <SmallText>
              Beta: Contact
              {' '}
              <a href="mailto:ben@bdenzer.com">ben@bdenzer.com</a>
              {' '}
              to extend membership
            </SmallText>
          </DetailRow>
          <ButtonContainer>
            <FormButton onClick={toggleChangePwForm} hidden={changePwFormOpen}>
              Change Password
            </FormButton>
          </ButtonContainer>
        </div>
        <div>
          {accountExpired && !loading
            ? <h2>Account Expired</h2>
            : <h2>Custom Word List</h2>}
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
