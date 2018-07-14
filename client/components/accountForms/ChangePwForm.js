import React, { Component } from 'react';
import changePw from '../../api/changePw';

import {
  AccountForm,
  FormButton,
  FormErrorBox,
  FormLabel,
  FormSuccessBox,
  FormTextInput
} from './formStyles';

class ChangePwForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPassword: '',
      error: null,
      newPassword: '',
      newPw2: '',
      success: null
    };

    this.changePwSuccess = this.changePwSuccess.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  changePwSuccess() {
    this.setState({
      currentPassword: '',
      newPassword: '',
      newPw2: '',
      error: null,
      success: true
    });
    setTimeout(() => {
      this.setState({ success: null }, () => {
        this.props.toggleChangePwForm();
      });
    }, 3000);
  }

  handleInput(e) {
    if (this.state.error) {
      this.setState({ error: '' });
    }
    const { dataset, value } = e.target;
    this.setState({ [dataset.inputId]: value });
  }

  submitForm(e) {
    e.preventDefault();
    const { currentPassword, newPassword, newPw2 } = this.state;
    const { token } = this.props;
    if (newPassword.length < 7) {
      this.setState({ error: 'Password Must Be At Least 7 Characters Long' });
      return;
    } else if (newPassword !== newPw2) {
      this.setState({ error: 'Passwords Do Not Match' });
      return;
    }
    changePw({ currentPassword, newPassword, newPw2, token })
      .then(() => this.changePwSuccess())
      .catch(err => this.setState({ error: err }));
  }

  render() {
    const { currentPassword, error, newPassword, newPw2, success } = this.state;
    return (
      <AccountForm className="smallForm centered">
        <FormLabel>Current Password</FormLabel>
        <FormTextInput
          onChange={this.handleInput}
          data-input-id="currentPassword"
          type="password"
          value={currentPassword}
        />
        <FormLabel>New Password</FormLabel>
        <FormTextInput
          onChange={this.handleInput}
          data-input-id="newPassword"
          type="password"
          value={newPassword}
        />
        <FormLabel>Re-Type Password</FormLabel>
        <FormTextInput
          onChange={this.handleInput}
          data-input-id="newPw2"
          type="password"
          value={newPw2}
        />
        {error && <FormErrorBox>{error}</FormErrorBox>}
        {success && <FormSuccessBox>Password Changed</FormSuccessBox>}
        <FormButton type="submit" onClick={this.submitForm}>Submit</FormButton>
      </AccountForm>
    );
  }
}

export default ChangePwForm;
