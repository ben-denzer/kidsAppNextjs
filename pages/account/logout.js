import React, { Component } from 'react';
import AnalyticsWrapper from '../../client/containers/AnalyticsWrapper';
import MainLayout from '../../client/components/MainLayout';
import { setInStorage } from '../../client/utils/mswLocalStorage';

export default class LogoutPage extends Component {
  componentDidMount() {
    this.removeData();
    setTimeout(() => window.location = '/', 5000);
  }
  removeData() {
    setInStorage('token', null);
    setInStorage('children', null);
    setInStorage('activeChild', null);
    setInStorage('coins', null);
  }
  render() {
    return (
      <div>
        <AnalyticsWrapper>
          You Have Been Logged Out.
        </AnalyticsWrapper>
      </div>
    );
  }
}
