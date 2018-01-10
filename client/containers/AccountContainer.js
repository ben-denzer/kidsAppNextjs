import React, { Component } from 'react';
import Router from 'next/router';
import MainLayout from '../components/MainLayout';
import AccountHome from '../components/AccountHome/AccountHome';
import { getFromStorage } from '../utils/mswLocalStorage';
import getWordsForChild from '../api/getWordsForChild';

class AccountContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      changePwFormOpen: false,
      children: []
    }

    this.toggleChangePwForm = this.toggleChangePwForm.bind(this);
  }

  componentDidMount() {
    const children = getFromStorage('children');
    this.setState({ children });
    getWordsForChild({ childId: 551 })
      .then(words => console.log('found words', words))
      .catch(e => console.log(e));
  }

  toggleChangePwForm() {
    this.setState({ changePwFormOpen: !this.state.changePwFormOpen });
  }

  render() {
    return (
      <AccountHome
        {...this.props}
        {...this.state}
        toggleChangePwForm={this.toggleChangePwForm}
      />
    );
  }
}

export default MainLayout(AccountContainer);
