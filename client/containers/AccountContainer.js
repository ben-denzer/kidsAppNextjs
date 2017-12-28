import React, { Component } from 'react';
import Router from 'next/router';
import MainLayout from '../components/MainLayout';
import AccountHome from '../components/AccountHome/AccountHome';
import { getFromStorage } from '../utils/mswLocalStorage';

class AccountContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      token: null
    };
  }

  componentDidMount() {
    const token = getFromStorage('token');
    if (!token) {
      Router.replace('/account/login');
    } else {
      this.setState({ token });
    }
  }

  render() {
    return (
      <AccountHome {...this.props} {...this.state} />
    );
  }
}

export default MainLayout(AccountContainer);
