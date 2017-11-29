import React, { Component } from 'react';

export default class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      childCount: 1,
      email: '',
      password: '',
      p2: ''
    }

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    const { dataset, value } = e.target;
    const inputId = dataset.inputId;
    this.setState({ [inputId]: value });
  }

  render() {
    const { childCount, email, password, p2 } = this.state;
    return (
      <form>
        <label>Email</label>
        <input
          onChange={this.handleInput}
          data-input-id="email"
          type="email"
          value={email}
        />
        <label>Password</label>
        <input
          onChange={this.handleInput}
          data-input-id="password"
          type="password"
          value={password}
        />
        <label>Re-Enter Password</label>
        <input
          onChange={this.handleInput}
          data-input-id="p2"
          type="password"
          value={p2}
        />
        <label>Number of Students</label>
        <input
          onChange={this.handleInput}
          data-input-id="childCount"
          type="number"
          value={childCount}
        />
      </form>
    );
  }
}
