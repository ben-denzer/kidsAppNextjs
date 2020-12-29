import React, { Component } from 'react';
import MainLayout from '../MainLayout';
import { setInStorage } from '../../utils/mswLocalStorage';

class Logout extends Component {
  componentDidMount() {
    this.removeData();
    this.redirectTimer = setTimeout(() => window.location = '/', 5000);
  }

  componentWillUnmount() {
    clearTimeout(this.redirectTimer);
  }

  removeData() {
    setInStorage('token', null);
    setInStorage('children', null);
    setInStorage('activeChild', null);
  }

  render() {
    return (
      <div className="whiteBox">
        <h3 style={{ textAlign: 'center' }}>You Have Been Logged Out</h3>
      </div>
    );
  }
}

export default MainLayout(Logout);
