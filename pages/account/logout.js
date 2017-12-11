import React, { Component } from 'react';
import AnalyticsWrapper from '../../client/containers/AnalyticsWrapper';
import MainLayout from '../../client/components/MainLayout';
import { setInStorage } from '../../client/utils/mswLocalStorage';

export default class LogoutPage extends Component {
  componentDidMount() {
    setInStorage('token', null);
    setInStorage('children', null);
    setTimeout(() => window.location = '/', 5000);
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
