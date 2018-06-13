import React, { Component } from 'react';
import MainLayout from '../MainLayout';
import resetPw from '../../api/resetPw';
import {
  AccountForm,
  FormButton,
  FormErrorBox,
  FormLabel,
  FormSuccessBox,
  FormTextInput
} from './formStyles';

class ResetPwForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      password: '',
      p2: '',
      success: false
    };

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
    const { password, p2 } = this.state;
    resetPw({ password, p2 })
      .then(() => {
        this.setState({ success: true });
        setTimeout(() => window.location = '/account/login', 2000);
      })
      .catch(error => this.setState({ error }));
  }

  render() {
    const { password, p2 } = this.state;
    return (
      <div className="whiteBox">
        <AccountForm>
          <h1>Reset Password</h1>
          <FormLabel>New Password</FormLabel>
          <FormTextInput
            onChange={this.handleInput}
            data-input-id="password"
            type="password"
            value={password}
          />
          <FormLabel>Re-Enter Password</FormLabel>
          <FormTextInput
            onChange={this.handleInput}
            data-input-id="p2"
            type="password"
            value={p2}
          />
          {this.state.error && <FormErrorBox>{this.state.error}</FormErrorBox>}
          {this.state.success &&
            <FormSuccessBox>Your Password Has Been Reset</FormSuccessBox>}
          <FormButton type="submit" onClick={this.submitForm}>
            Submit
          </FormButton>
        </AccountForm>
      </div>
    );
  }
}

export default MainLayout(ResetPwForm);
