import React, { Component } from 'react';
import getWords from '../../client/utils/getWords';
import FlashcardsPage from '../../client/components/Flashcards/FlashcardsPage';
import AnalyticsWrapper from '../../client/containers/AnalyticsWrapper';
import MainLayout from '../../client/components/MainLayout';
import Head from 'next/head';

export default class Flashcards extends Component {
  // static async getInitialProps() {
  //   getWords().then(words => words || {}).catch(err => console.log(err));
  // }

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
