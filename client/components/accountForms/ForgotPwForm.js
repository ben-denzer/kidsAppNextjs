import React, { Component } from 'react';
import Link from 'next/link';
import MainLayout from '../MainLayout';
import forgotPw from '../../api/forgotPw';

import {
  AccountForm,
  FormButton,
  FormErrorBox,
  FormExtraOptions,
  FormLabel,
  FormSuccessBox,
  FormTextInput
} from './formStyles';

class ForgotPwForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      error: '',
      password: '',
      success: false
    }

    this.handleInput = this.handleInput.bind(this);
    this.submitForm = this.submitForm.bind(this);
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
    const { email } = this.state;
    forgotPw({ email })
      .then(() => {
        this.setState({ success: true });
        setTimeout(() => { window.location = '/account/login' }, 5000 );
      }).catch(error => this.setState({ error }));
  }

  render() {
    const { email, error, success } = this.state;
    return (
      <div className="whiteBox">
        <AccountForm>
          <h1>Forgot Password</h1>
          <FormLabel>Email</FormLabel>
          <FormTextInput
            onChange={this.handleInput}
            data-input-id="email"
            type="email"
            value={email}
          />

          { this.state.error && <FormErrorBox>{error}</FormErrorBox> }
          { this.state.success && <FormSuccessBox>An Email Has Been Sent</FormSuccessBox> }
          <FormButton type="submit" onClick={this.submitForm}>Log In</FormButton>
          <FormExtraOptions>
            <Link prefetch href={'/account/login'}>
              <a title="Log In">Log In</a>
            </Link>
            <Link prefetch href={'/account/signup'}>
              <a title="Sign Up">Sign Up</a>
            </Link>
          </FormExtraOptions>
        </AccountForm>
      </div>
    );
  }
}

export default MainLayout(ForgotPwForm);
