import React, { Component } from 'react';
import MainLayout from '../MainLayout';
import setUserInStorage from '../../utils/setUserInStorage';

import userLogin from '../../api/userLogin';
import {
  AccountForm,
  FormButton,
  FormErrorBox,
  FormLabel,
  FormTextInput
} from './formStyles';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      error: '',
      password: '',
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
    const { email, password } = this.state;
    userLogin({ email, password })
      .then(data => {
        setUserInStorage(data);
        window.location = '/';
      }).catch(error => this.setState({ error }));
  }

  render() {
    const { email, error, password } = this.state;
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

          { this.state.error && <FormErrorBox>{error}</FormErrorBox> }
          <FormButton type="submit" onClick={this.submitForm}>Log In</FormButton>
        </AccountForm>
      </div>
    );
  }
}

export default MainLayout(LoginForm);
