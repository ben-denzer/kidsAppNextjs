import React, { Component } from 'react';
import { initGA, logPageView } from '../services/analytics';

export default class AnalyticsWrapper extends Component {
  componentDidMount() {
    if (process.env.NODE_ENV === 'development') return;

    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
