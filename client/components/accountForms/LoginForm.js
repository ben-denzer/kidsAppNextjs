import React, { Component } from 'react';
import Link from 'next/link';
import MainLayout from '../MainLayout';
import { getFromStorage } from '../../utils/mswLocalStorage';
import setUserInStorage from '../../utils/setUserInStorage';

import userLogin from '../../api/userLogin';
import {
  AccountForm,
  FormButton,
  FormCheckbox,
  FormErrorBox,
  FormExtraOptions,
  FormLabel,
  FormTextInput,
  RememberMeContainer
} from './formStyles';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      error: '',
      password: '',
      rememberMe: false
    }

    this.handleCheck = this.handleCheck.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    const email = getFromStorage('email');
    if (email) {
      const password = getFromStorage('password');
      this.setState({ email, password, rememberMe: true });
    }
  }

  handleCheck(e) {
    const { dataset, checked } = e.target;
    this.setState({ [dataset.inputId]: checked });
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
    const { email, password, rememberMe } = this.state;
    userLogin({ email, password })
      .then(data => {
        if (rememberMe) data = Object.assign(data, { email, password });
        setUserInStorage(data, rememberMe);
        window.location = '/account/home';
      }).catch(error => this.setState({ error }));
  }

  render() {
    const { email, error, password, rememberMe } = this.state;
    return (
      <div className="whiteBox">
        <AccountForm>
          <h1>Log In</h1>
          <FormLabel>Email</FormLabel>
          <FormTextInput
            onChange={this.handleInput}
            data-input-id="email"
            type="email"
            value={email}
          />
          <FormLabel>Password</FormLabel>
          <FormTextInput
            onChange={this.handleInput}
            data-input-id="password"
            type="password"
            value={password}
          />

          <RememberMeContainer>
            <FormCheckbox
              onChange={this.handleCheck}
              data-input-id="rememberMe"
              type="checkbox"
              checked={rememberMe}
            />
            <FormLabel>Remember Me</FormLabel>
          </RememberMeContainer>

          { this.state.error && <FormErrorBox>{error}</FormErrorBox> }
          <FormButton type="submit" onClick={this.submitForm}>Log In</FormButton>
          <FormExtraOptions>
            <Link prefetch href={'/account/signup'}>
              <a title="Sign Up">Sign Up</a>
            </Link>
            <Link prefetch href={'/account/forgotpassword'}>
              <a title="Forgot Password">Forgot Password</a>
            </Link>
          </FormExtraOptions>
        </AccountForm>
      </div>
    );
  }
}

export default MainLayout(LoginForm);
