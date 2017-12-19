import React, { Component } from 'react';
import MainLayout from '../MainLayout';
import signupUser from '../../api/signupUser';
import setUserInStorage from '../../utils/setUserInStorage';
import verifySignupInfo from '../../utils/verifySignupInfo';
import {
  AccountForm,
  Form2Cols,
  FormButton,
  FormErrorBox,
  FormHalf,
  FormLabel,
  FormRadioButton,
  FormTextInput
} from './formStyles';

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      childCount: 1,
      children: [''],
      email: '',
      emailList: true,
      error: '',
      password: '',
      p2: ''
    }

    this.createChildInputs = this.createChildInputs.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  createChildInputs(count) {
    let childInputs = [];
    for (let i = 0; i < count; i++) {
      childInputs = [
        ...childInputs,
        [
          <FormLabel key={`child${i}Label`}>
            Child #{i+1} Name
          </FormLabel>,
          <FormTextInput
            key={`child${i}Input`}
            data-input-id="children"
            data-input-index={i}
            onChange={this.handleInput}
            value={this.state.children[i]}
          />
        ]
      ];
    }
    return childInputs;
  }

  handleCheck(e) {
    const { dataset, checked } = e.target;
    this.setState({ [dataset.inputId]: checked });
  }

  handleInput(e) {  // TODO - Refactor this mess
    if (this.state.error) {
      this.setState({ error: '' });
    }
    const { dataset, value } = e.target;
    if (dataset.inputId === 'childCount') {
      if (value < 0) {
        this.setState({ childCount: 1 });
        return;
      }
      let children = this.state.children;
      // I don't want to erase any names that have already been typed in so I don't
      // set children.length when it'll do that
      if (children.length <= value) {
        children.length = value;
      }
      for (let i = 0; i < value; i++) {
        if (!children[i]) children[i] = '';
      }
      this.setState({ childCount: value, children });
      return;
    } else if (dataset.inputId === 'children') {
      const children = [
        ...this.state.children.slice(0, dataset.inputIndex),
        value,
        ...this.state.children.slice(dataset.inputIndex + 1)
      ];
      this.setState({ children });
      return;
    }

    this.setState({ [dataset.inputId]: value });
  }

  submitForm(e) {
    e.preventDefault();
    const { childCount, email, password, p2 } = this.state;
    let { children } = this.state;
    children.length = childCount;
    verifySignupInfo(this.state)
      .then(result => signupUser(this.state))
      .then(data => {
        setUserInStorage(data);
        window.location = '/';
      })
      .catch(error => this.setState({ error }));
  }

  render() {
    const { childCount, email, emailList, password, p2 } = this.state;
    const childInputs = this.createChildInputs(childCount);
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
              <FormLabel>Number of Students</FormLabel>
              <FormTextInput
                onChange={this.handleInput}
                data-input-id="childCount"
                type="number"
                value={childCount}
              />
              {childInputs}
            </FormHalf>
          </Form2Cols>
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
        </AccountForm>
      </div>
    );
  }
}

export default MainLayout(SignupForm);
