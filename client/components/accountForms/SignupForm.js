import React, { Component } from 'react';
import verifySignupInfo from '../../utils/verifySignupInfo';
import signupUser from '../../api/signupUser';
import {
  AccountForm,
  FormButton,
  FormErrorBox,
  FormLabel,
  FormRadioButton,
  FormTextInput
} from './formStyles';

export default class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      childCount: 1,
      email: '',
      emailList: true,
      error: '',
      password: '',
      p2: ''
    }

    this.handleCheck = this.handleCheck.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleCheck(e) {
    const { dataset, checked } = e.target;
    this.setState({ [dataset.inputId]: checked });
  }

  handleInput(e) {
    const { dataset, value } = e.target;
    this.setState({ [dataset.inputId]: value });
  }

  submitForm(e) {
    e.preventDefault();
    const { childCount, email, password, p2 } = this.state;
    verifySignupInfo(this.state)
      .then(result => signupUser(this.state))
      .then(() => console.log('user inserted!!'))
      .catch(error => this.setState({ error }));
  }

  render() {
    const { childCount, email, emailList, password, p2 } = this.state;
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
          <FormLabel>
            I would like to receive news about site updates and other learning resources
          </FormLabel>
          <FormRadioButton
            onChange={this.handleCheck}
            data-input-id="emailList"
            type="checkbox"
            checked={emailList}
          />
          { this.state.error && <FormErrorBox>{this.state.error}</FormErrorBox> }
          <FormButton type="submit" onClick={this.submitForm}>Submit</FormButton>
        </AccountForm>
      </div>
    );
  }
}
