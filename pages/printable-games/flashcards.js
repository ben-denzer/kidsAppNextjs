import React, { Component } from 'react';
import FlashcardsPage from '../../client/components/Flashcards/FlashcardsPage';
import AnalyticsWrapper from '../../client/containers/AnalyticsWrapper';
import Head from 'next/head';

export default class Flashcards extends Component {
  render() {
    return (
      <div>
        <Head>
          <title>Print Your Flash Cards | My Sight Words.com</title>
        </Head>
        <AnalyticsWrapper>
          <FlashcardsPage {...this.props} />
        </AnalyticsWrapper>
      </div>
    );
  }
}
