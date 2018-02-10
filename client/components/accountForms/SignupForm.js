import React, { Component } from 'react';
import Link from 'next/link';
import MainLayout from '../MainLayout';
import signupUser from '../../api/signupUser';
import setUserInStorage from '../../utils/setUserInStorage';
import verifySignupInfo from '../../utils/verifySignupInfo';
import {
  AccountForm,
  FakeLink,
  Form2Cols,
  FormButton,
  FormCheckbox,
  FormErrorBox,
  FormExtraOptions,
  FormHalf,
  FormLabel,
  FormRadioButton,
  FormTextInput,
  RememberMeContainer
} from './formStyles';

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      children: [''],
      email: '',
      emailList: true,
      error: '',
      password: '',
      p2: '',
      rememberMe: false
    }

    this.addChild = this.addChild.bind(this);
    this.createChildInputs = this.createChildInputs.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  addChild() {
    const children = [...this.state.children, ''];
    this.setState({ children });
  }

  createChildInputs() {
    return this.state.children.map((a, i) => {
      return (
        <React.Fragment key={i}>
          <FormLabel>
            Child #{i+1} Name
          </FormLabel>
          <FormTextInput
            data-input-id="children"
            data-input-index={i}
            onChange={this.handleInput}
            value={this.state.children[i]}
          />
        </React.Fragment>
      );
    });
  }

  handleCheck(e) {
    const { dataset, checked } = e.target;
    this.setState({ [dataset.inputId]: checked });
  }

  handleInput(e) {
    const { dataset, value } = e.target;
    if (this.state.error) {
      this.setState({ error: '' });
    }
    if (dataset.inputId === 'children') {
      let children = this.state.children;
      children[dataset.inputIndex] = value;
      this.setState({ children });
      return;
    }
    this.setState({ [dataset.inputId]: value });
  }

  submitForm(e) {
    e.preventDefault();
    const { email, password, p2, rememberMe } = this.state;
    let { children } = this.state;
    children = children.filter(a => a).map(a => a.trim());
    verifySignupInfo(this.state)
      .then(result => signupUser(this.state))
      .then(data => {
        if (rememberMe) data = Object.assign(data, { email, password });
        setUserInStorage(data, rememberMe);
        window.location = '/account/home';
      })
      .catch(error => this.setState({ error }));
  }

  render() {
    const { email, emailList, password, p2, rememberMe } = this.state;
    const childInputs = this.createChildInputs();
    return (
      <div className="whiteBox">
        <AccountForm>
          <h1>Sign Up</h1>
          <Form2Cols>
            <FormHalf>
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
            </FormHalf>
            <FormHalf>
              {childInputs}
              <FakeLink onClick={this.addChild}>Add Child</FakeLink>
            </FormHalf>
          </Form2Cols>
          <RememberMeContainer>
            <FormCheckbox
              onChange={this.handleCheck}
              data-input-id="rememberMe"
              type="checkbox"
              checked={rememberMe}
            />
            <FormLabel>Remember Me</FormLabel>
          </RememberMeContainer>
          <FormLabel>
            <FormRadioButton
              onChange={this.handleCheck}
              data-input-id="emailList"
              type="checkbox"
              checked={emailList}
            />
            I would like to receive news about site updates and other learning resources
          </FormLabel>
          { this.state.error && <FormErrorBox>{this.state.error}</FormErrorBox> }
          <FormButton type="submit" onClick={this.submitForm}>Submit</FormButton>
          <FormExtraOptions>
            <Link prefetch href={'/account/login'}>
              <a title="Log In">Log In</a>
            </Link>
          </FormExtraOptions>
        </AccountForm>
      </div>
    );
  }
}

export default MainLayout(SignupForm);
