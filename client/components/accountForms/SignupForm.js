import React, { Component } from 'react';
import verifySignupInfo from '../../utils/verifySignupInfo';
import {
  AccountForm,
  FormButton,
  FormErrorBox,
  FormLabel,
  FormTextInput
} from './formStyles';

export default class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      childCount: 1,
      email: '',
      error: '',
      password: '',
      p2: ''
    }

    this.handleInput = this.handleInput.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleInput(e) {
    const { dataset, value } = e.target;
    const inputId = dataset.inputId;
    this.setState({ [inputId]: value });
  }

  submitForm(e) {
    e.preventDefault();
    const { childCount, email, password, p2 } = this.state;
    verifySignupInfo(this.state)
      .then(result => this.setState({ error: 'verified' }))
      .catch(error => this.setState({ error }));
  }

  render() {
    const { childCount, email, password, p2 } = this.state;
    return (
      <div className="whiteBox">
        <AccountForm>
          <h1>Sign Up</h1>
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
          <FormLabel>Re-Enter Password</FormLabel>
          <FormTextInput
            onChange={this.handleInput}
            data-input-id="p2"
            type="password"
            value={p2}
          />
          <FormLabel>Number of Students</FormLabel>
          <FormTextInput
            onChange={this.handleInput}
            data-input-id="childCount"
            type="number"
            value={childCount}
          />
          { this.state.error && <FormErrorBox>{this.state.error}</FormErrorBox> }
          <FormButton type="submit" onClick={this.submitForm}>Submit</FormButton>
        </AccountForm>
      </div>
    );
  }
}
