import React, { Component } from 'react';
import Router from 'next/router';
import MainLayout from '../components/MainLayout';
import AccountHome from '../components/AccountHome/AccountHome';
import { getFromStorage } from '../utils/mswLocalStorage';

class AccountContainer extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <AccountHome {...this.props} {...this.state} />
    );
  }
}

export default MainLayout(AccountContainer);
